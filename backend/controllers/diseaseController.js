const DiseaseScan = require('../models/DiseaseScan');
const cloudinary = require('../config/cloudinary');
const fs = require('fs');
const path = require('path');

// @desc    Upload and analyze disease
// @route   POST /api/disease/analyze
// @access  Private
const analyzeDisease = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload an image',
      });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'disease_scans',
      resource_type: 'image',
    });

    // Remove file from local uploads
    fs.unlinkSync(req.file.path);

    // For now, return mock AI prediction (replace with actual AI model later)
    const mockPredictions = [
      {
        diseaseName: 'Leaf Blight',
        confidence: 85,
        treatment: 'Apply copper-based fungicide. Remove affected leaves.',
        prevention: 'Ensure proper spacing between plants. Avoid overhead watering.',
      },
      {
        diseaseName: 'Powdery Mildew',
        confidence: 72,
        treatment: 'Use sulfur-based fungicide. Improve air circulation.',
        prevention: 'Plant resistant varieties. Avoid high humidity.',
      },
      {
        diseaseName: 'Healthy Plant',
        confidence: 90,
        treatment: 'No treatment needed.',
        prevention: 'Continue good farming practices.',
      },
    ];

    const randomPrediction = mockPredictions[Math.floor(Math.random() * mockPredictions.length)];

    // Save scan to database
    const scan = await DiseaseScan.create({
      user: req.user._id,
      imageUrl: result.secure_url,
      ...randomPrediction,
    });

    res.status(201).json({
      success: true,
      message: 'Disease analysis completed',
      data: scan,
    });
  } catch (error) {
    // Clean up file if upload failed
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    next(error);
  }
};

// @desc    Get user's disease scans
// @route   GET /api/disease/scans
// @access  Private
const getUserScans = async (req, res, next) => {
  try {
    const scans = await DiseaseScan.find({ user: req.user._id })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: scans.length,
      data: scans,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all disease scans (admin)
// @route   GET /api/disease/all
// @access  Private/Admin
const getAllScans = async (req, res, next) => {
  try {
    const scans = await DiseaseScan.find()
      .populate('user', 'fullName email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: scans.length,
      data: scans,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete disease scan
// @route   DELETE /api/disease/:id
// @access  Private
const deleteScan = async (req, res, next) => {
  try {
    const scan = await DiseaseScan.findById(req.params.id);
    
    if (!scan) {
      return res.status(404).json({
        success: false,
        message: 'Scan not found',
      });
    }

    // Check ownership
    if (scan.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this scan',
      });
    }

    await scan.remove();

    res.json({
      success: true,
      message: 'Scan deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  analyzeDisease,
  getUserScans,
  getAllScans,
  deleteScan,
};