const { GoogleGenerativeAI, SchemaType } = require('@google/generative-ai');
const fs = require('fs/promises');
const cloudinary = require('../config/cloudinary');
const DiseaseScan = require('../models/DiseaseScan');

const SUPPORTED_IMAGE_TYPES = new Set([
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/heic',
  'image/heif',
]);

const DEFAULT_GEMINI_MODELS = [
  process.env.GEMINI_MODEL,
  'gemini-2.5-flash',
  'gemini-2.0-flash',
  'gemini-1.5-flash-latest',
  'gemini-1.5-flash',
].filter(Boolean);

const responseSchema = {
  type: SchemaType.OBJECT,
  properties: {
    cropName: { type: SchemaType.STRING },
    diseaseName: { type: SchemaType.STRING },
    confidence: { type: SchemaType.NUMBER },
    severity: { type: SchemaType.STRING },
    symptoms: {
      type: SchemaType.ARRAY,
      items: { type: SchemaType.STRING },
    },
    causes: {
      type: SchemaType.ARRAY,
      items: { type: SchemaType.STRING },
    },
    preventionTips: {
      type: SchemaType.ARRAY,
      items: { type: SchemaType.STRING },
    },
    treatmentSuggestions: {
      type: SchemaType.ARRAY,
      items: { type: SchemaType.STRING },
    },
    description: { type: SchemaType.STRING },
  },
  required: [
    'cropName',
    'diseaseName',
    'confidence',
    'severity',
    'symptoms',
    'causes',
    'preventionTips',
    'treatmentSuggestions',
    'description',
  ],
};

const prompt = `
You are an expert agricultural plant pathologist. Analyze the uploaded crop or leaf image.

Return only valid JSON matching the requested schema. Do not include markdown, code fences, or commentary.

Rules:
- Identify the crop if visible. If the crop cannot be identified, use "Unknown crop".
- If no disease is visible, set diseaseName to "Healthy Plant".
- confidence must be a number from 0 to 100.
- severity must be one of "Low", "Medium", or "High".
- Give real, image-based observations only. Do not invent a specific disease when the image is unclear.
- symptoms, causes, preventionTips, and treatmentSuggestions must be practical farmer-facing arrays.
- Include both organic/cultural controls and chemical treatment guidance when disease is present.
- If the image is not a crop/plant image, set diseaseName to "Unable to Analyze", confidence to 0, severity to "Low", and explain why in description.
`;

const normalizeMimeType = (mimeType = '') => {
  const normalized = mimeType.toLowerCase();
  if (normalized === 'image/jpg') return 'image/jpeg';
  return normalized;
};

const clampConfidence = (value) => {
  const number = Number(value);
  if (!Number.isFinite(number)) return 0;
  return Math.max(0, Math.min(100, Math.round(number)));
};

const normalizeSeverity = (severity, confidence) => {
  const value = String(severity || '').trim().toLowerCase();
  if (value === 'high') return 'High';
  if (value === 'medium') return 'Medium';
  if (value === 'low') return 'Low';
  if (confidence >= 67) return 'High';
  if (confidence >= 34) return 'Medium';
  return 'Low';
};

const normalizeStringArray = (value) => {
  if (Array.isArray(value)) {
    return value
      .map((item) => String(item || '').trim())
      .filter(Boolean);
  }

  if (typeof value === 'string' && value.trim()) {
    return [value.trim()];
  }

  return [];
};

const parseGeminiJson = (text) => {
  if (!text || typeof text !== 'string') {
    throw new Error('Gemini returned an empty response');
  }

  const cleaned = text
    .trim()
    .replace(/^```(?:json)?/i, '')
    .replace(/```$/i, '')
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch (directError) {
    const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw directError;
    }
    return JSON.parse(jsonMatch[0]);
  }
};

const normalizeDiseaseData = (raw) => {
  const confidence = clampConfidence(raw?.confidence);
  const severity = normalizeSeverity(raw?.severity, confidence);
  const diseaseName = String(raw?.diseaseName || 'Unable to Analyze').trim();
  const symptoms = normalizeStringArray(raw?.symptoms);
  const causes = normalizeStringArray(raw?.causes);
  const preventionTips = normalizeStringArray(raw?.preventionTips);
  const treatmentSuggestions = normalizeStringArray(raw?.treatmentSuggestions);

  return {
    cropName: String(raw?.cropName || 'Unknown crop').trim(),
    diseaseName,
    confidence,
    severity,
    symptoms,
    causes,
    preventionTips,
    treatmentSuggestions,
    prevention: preventionTips.join('\n'),
    treatment: treatmentSuggestions.join('\n'),
    description: String(raw?.description || '').trim(),
  };
};

const getGeminiClient = () => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not configured');
  }

  return new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
};

const isUnsupportedModelError = (error) => {
  const message = String(error?.message || '').toLowerCase();
  return (
    message.includes('not found') ||
    message.includes('not supported') ||
    message.includes('unsupported') ||
    message.includes('model')
  );
};

const analyzeWithGemini = async ({ base64Image, mimeType }) => {
  const genAI = getGeminiClient();
  let lastError;

  for (const modelName of DEFAULT_GEMINI_MODELS) {
    try {
      const model = genAI.getGenerativeModel({
        model: modelName,
        generationConfig: {
          temperature: 0.2,
          responseMimeType: 'application/json',
          responseSchema,
        },
      });

      const result = await model.generateContent([
        { text: prompt },
        {
          inlineData: {
            data: base64Image,
            mimeType,
          },
        },
      ]);

      const response = result?.response;
      const text = response?.text?.();

      if (!text) {
        const blockReason = response?.promptFeedback?.blockReason;
        throw new Error(blockReason ? `Gemini blocked the image: ${blockReason}` : 'Gemini returned no text');
      }

      return {
        data: normalizeDiseaseData(parseGeminiJson(text)),
        modelName,
        rawText: text,
      };
    } catch (error) {
      lastError = error;
      console.error(`[DiseaseController] Gemini model ${modelName} failed:`, error?.message || error);

      if (!isUnsupportedModelError(error)) {
        break;
      }
    }
  }

  throw lastError || new Error('Gemini analysis failed');
};

const removeLocalFile = async (filePath) => {
  if (!filePath) return;

  try {
    await fs.unlink(filePath);
  } catch (error) {
    console.warn('[DiseaseController] Failed to clean up temp file:', error?.message || error);
  }
};

const getGeminiErrorResponse = (error) => {
  const message = String(error?.message || '');
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('quota')) {
    return { status: 429, message: 'Gemini API quota exceeded. Please try again later.' };
  }

  if (lowerMessage.includes('api key') || lowerMessage.includes('permission') || lowerMessage.includes('unauthorized')) {
    return { status: 502, message: 'Gemini API credentials are invalid or not authorized.' };
  }

  if (lowerMessage.includes('blocked') || lowerMessage.includes('safety')) {
    return { status: 422, message: 'Gemini could not analyze this image because it was blocked by safety filters.' };
  }

  if (lowerMessage.includes('model') || lowerMessage.includes('not found') || lowerMessage.includes('unsupported')) {
    return { status: 502, message: 'No supported Gemini Vision model is available for this API key.' };
  }

  return { status: 502, message: 'Gemini Vision analysis failed. Please try another clear crop image.' };
};

// @desc    Analyze crop disease using Gemini Vision API
// @route   POST /api/disease/analyze
// @access  Private
const analyzeDisease = async (req, res) => {
  const filePath = req.file?.path;

  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload an image file.',
      });
    }

    const mimeType = normalizeMimeType(req.file.mimetype);

    if (!SUPPORTED_IMAGE_TYPES.has(mimeType)) {
      await removeLocalFile(filePath);
      return res.status(400).json({
        success: false,
        message: 'Unsupported file type. Please upload a JPG, PNG, WEBP, HEIC, or HEIF image.',
      });
    }

    const [cloudinaryResult, imageBuffer] = await Promise.all([
      cloudinary.uploader.upload(filePath, {
        folder: 'disease-detection',
        resource_type: 'image',
        use_filename: true,
        unique_filename: true,
      }),
      fs.readFile(filePath),
    ]);

    const base64Image = imageBuffer.toString('base64');
    const geminiResult = await analyzeWithGemini({ base64Image, mimeType });
    const diseaseData = geminiResult.data;

    const scan = await DiseaseScan.create({
      user: req.user._id,
      imageUrl: cloudinaryResult.secure_url,
      cropName: diseaseData.cropName,
      diseaseName: diseaseData.diseaseName,
      confidence: diseaseData.confidence,
      severity: diseaseData.severity,
      symptoms: diseaseData.symptoms,
      causes: diseaseData.causes,
      preventionTips: diseaseData.preventionTips,
      treatmentSuggestions: diseaseData.treatmentSuggestions,
      prevention: diseaseData.prevention,
      treatment: diseaseData.treatment,
      description: diseaseData.description,
      aiModel: geminiResult.modelName,
    });

    await removeLocalFile(filePath);

    return res.status(200).json({
      success: true,
      data: {
        id: scan._id,
        _id: scan._id,
        imageUrl: scan.imageUrl,
        cropName: scan.cropName,
        diseaseName: scan.diseaseName,
        confidence: scan.confidence,
        severity: scan.severity,
        symptoms: scan.symptoms,
        causes: scan.causes,
        preventionTips: scan.preventionTips,
        treatmentSuggestions: scan.treatmentSuggestions,
        prevention: scan.prevention,
        treatment: scan.treatment,
        description: scan.description,
        aiModel: scan.aiModel,
        detectedAt: scan.createdAt,
        createdAt: scan.createdAt,
      },
    });
  } catch (error) {
    await removeLocalFile(filePath);
    console.error('[DiseaseController] Analysis failed:', error);

    const geminiError = getGeminiErrorResponse(error);

    return res.status(geminiError.status).json({
      success: false,
      message: geminiError.message,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

// @desc    Get user's disease scans
// @route   GET /api/disease/scans
// @access  Private
const getUserScans = async (req, res) => {
  try {
    const scans = await DiseaseScan.find({ user: req.user._id }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: scans.length,
      data: scans,
    });
  } catch (error) {
    console.error('[DiseaseController] Get user scans failed:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch disease scans.',
    });
  }
};

// @desc    Get all disease scans (admin)
// @route   GET /api/disease/all
// @access  Private/Admin
const getAllScans = async (req, res) => {
  try {
    const scans = await DiseaseScan.find({})
      .populate('user', 'fullName email location')
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: scans.length,
      data: scans,
    });
  } catch (error) {
    console.error('[DiseaseController] Get all scans failed:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch all disease scans.',
    });
  }
};

// @desc    Delete disease scan
// @route   DELETE /api/disease/:id
// @access  Private
const deleteScan = async (req, res) => {
  try {
    const query = {
      _id: req.params.id,
      ...(req.user.role === 'admin' ? {} : { user: req.user._id }),
    };

    const scan = await DiseaseScan.findOneAndDelete(query);

    if (!scan) {
      return res.status(404).json({
        success: false,
        message: 'Disease scan not found.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Scan deleted successfully.',
    });
  } catch (error) {
    console.error('[DiseaseController] Delete scan failed:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete disease scan.',
    });
  }
};

module.exports = {
  analyzeDisease,
  getUserScans,
  getAllScans,
  deleteScan,
};
