import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, 
  ScanLine, 
  AlertTriangle, 
  CheckCircle, 
  Loader2, 
  Droplets, 
  Sun, 
  Thermometer, 
  Camera, 
  RefreshCw, 
  Trash2,
  Leaf,
  Shield,
  Stethoscope,
  AlertCircle
} from 'lucide-react';
import { diseaseAPI } from '@/services/api';
import { cn, getSeverityColor } from '@/utils/helpers';
import toast from 'react-hot-toast';
import type { DiseaseDetectionResult } from '@/types';

export default function DiseaseDetectionPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DiseaseDetectionResult | null>(null);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file (JPG, PNG, WEBP)');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size should be less than 10MB');
      return;
    }
    
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setResult(null);
    setAnalysisError(null);
    
    toast.success('Image uploaded successfully!');
  };

  const handleRemoveImage = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setSelectedFile(null);
    setPreviewUrl(null);
    setResult(null);
    setAnalysisError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    toast.success('Image removed');
  };

  const handleChangeImage = () => {
    fileInputRef.current?.click();
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      toast.error('Please select an image first');
      return;
    }
    
    setIsAnalyzing(true);
    setAnalysisError(null);
    
    try {
      const responseData = await diseaseAPI.detectDisease(selectedFile);
      console.log('API Response:', responseData);
      
      if (!responseData) {
        throw new Error('No response from server');
      }
      
      // Map API response to frontend format with safe defaults
      const mappedResult: DiseaseDetectionResult = {
        id: responseData?.id || responseData?._id || Date.now().toString(),
        _id: responseData?._id,
        cropName: responseData?.cropName || 'Unknown crop',
        diseaseName: responseData?.diseaseName || 'Unknown Disease',
        confidence: Math.max(0, Math.min(100, Number(responseData?.confidence ?? 0))),
        severity: responseData?.severity || 
          ((responseData?.confidence || 0) > 80 ? 'High' : 
           (responseData?.confidence || 0) > 50 ? 'Medium' : 'Low'),
        symptoms: Array.isArray(responseData?.symptoms) ? responseData.symptoms : [],
        causes: Array.isArray(responseData?.causes) ? responseData.causes : [],
        preventionTips: Array.isArray(responseData?.preventionTips) ? responseData.preventionTips : [],
        treatmentSuggestions: Array.isArray(responseData?.treatmentSuggestions) ? responseData.treatmentSuggestions : [],
        prevention: responseData?.prevention || '',
        treatment: responseData?.treatment || '',
        description: responseData?.description || '',
        imageUrl: responseData?.imageUrl || '',
        aiModel: responseData?.aiModel,
        detectedAt: responseData?.detectedAt || responseData?.createdAt || new Date().toISOString(),
      };
      
      setResult(mappedResult);
      
      if (mappedResult.diseaseName === 'Healthy Plant') {
        toast.success('Great news! Your plant appears healthy!');
      } else {
        toast.success(`Analysis complete! Detected: ${mappedResult.diseaseName}`);
      }
    } catch (error: any) {
      console.error('Analysis error:', error);
      const message = error?.message || 'Failed to analyze image. Please try again.';
      setResult(null);
      setAnalysisError(message);
      toast.error(message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full mb-4">
          <Leaf className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          AI Disease Detection
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Upload a crop or leaf image and our AI will analyze it to detect diseases, 
          identify symptoms, and provide treatment recommendations powered by Google Gemini.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="card p-6 lg:p-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
            <Upload className="w-5 h-5 mr-2 text-emerald-500" />
            Upload Crop Image
          </h2>
          
          {/* Upload Area - ALWAYS VISIBLE */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={cn(
              'border-2 border-dashed rounded-2xl p-6 text-center transition-all duration-300',
              dragActive
                ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                : previewUrl
                  ? 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800'
                  : 'border-gray-300 dark:border-gray-600 hover:border-emerald-400 hover:bg-gray-50 dark:hover:bg-gray-800'
            )}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
              className="hidden"
            />
            
            {previewUrl ? (
              <div className="space-y-4">
                <div className="relative group">
                  <img
                    src={previewUrl}
                    alt="Crop preview"
                    className="w-full h-56 object-cover rounded-xl"
                  />
                  <div className="absolute inset-0 bg-black/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleChangeImage();
                      }}
                      className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium flex items-center space-x-2"
                    >
                      <Camera className="w-4 h-4" />
                      <span>Change Image</span>
                    </button>
                  </div>
                </div>
                {selectedFile && (
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <Camera className="w-4 h-4" />
                    <span>{selectedFile.name}</span>
                    <span className="text-gray-400">|</span>
                    <span>{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</span>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-8"
              >
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                </div>
                <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Drop your image here, or click to browse
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Supports: JPG, PNG, WEBP (max 10MB)
                </p>
              </button>
            )}
          </div>

          {/* Action Buttons - Always show when image is selected */}
          {previewUrl && (
            <div className="mt-6 space-y-3">
              <div className="flex space-x-3">
                <button
                  onClick={handleChangeImage}
                  className="flex-1 btn-secondary flex items-center justify-center space-x-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Change Image</span>
                </button>
                <button
                  onClick={handleRemoveImage}
                  className="flex-1 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 px-4 py-3 rounded-lg font-medium transition-all flex items-center justify-center space-x-2"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Remove</span>
                </button>
              </div>

              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed py-4 text-lg"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Analyzing with AI...</span>
                  </>
                ) : (
                  <>
                    <ScanLine className="w-5 h-5" />
                    <span>{result ? 'Analyze Again' : 'Analyze Disease'}</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* AI Analyzing Animation */}
          <AnimatePresence>
            {isAnalyzing && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-6 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl border border-emerald-100 dark:border-emerald-800"
              >
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center">
                      <Leaf className="w-6 h-6 text-white animate-pulse" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                      <Loader2 className="w-3 h-3 text-white animate-spin" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-emerald-900 dark:text-emerald-300">
                      Gemini AI is analyzing your image...
                    </p>
                    <p className="text-sm text-emerald-600 dark:text-emerald-400">
                      Detecting diseases, symptoms, and treatment options
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex space-x-1">
                  {[0, 1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      className="h-1.5 bg-emerald-400 rounded-full flex-1"
                      animate={{
                        scaleY: [1, 2.5, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.15,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Results Section */}
        <div>
          {result ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card p-6 lg:p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className={cn(
                    'w-12 h-12 rounded-full flex items-center justify-center',
                    result.diseaseName === 'Healthy Plant' 
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                      : 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400'
                  )}>
                    {result.diseaseName === 'Healthy Plant' 
                      ? <CheckCircle className="w-6 h-6" />
                      : <AlertTriangle className="w-6 h-6" />
                    }
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      Detection Result
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Powered by Gemini AI
                    </p>
                  </div>
                </div>
                {result.severity && result.diseaseName !== 'Healthy Plant' && (
                  <span className={cn(
                    'px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide',
                    getSeverityColor(result.severity)
                  )}>
                    {result.severity}
                  </span>
                )}
              </div>

              {/* Disease Info */}
              <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Detected Condition</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {result.diseaseName}
                </h3>
                {result.cropName && (
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    Crop: {result.cropName}
                  </p>
                )}
                {result.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    {result.description}
                  </p>
                )}
                <div className="flex items-center space-x-3">
                  <div className="flex-1 h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={cn(
                        'h-full rounded-full transition-all duration-1000',
                        result.confidence > 70 ? 'bg-emerald-500' :
                        result.confidence > 40 ? 'bg-amber-500' : 'bg-red-500'
                      )}
                      style={{ width: `${result.confidence}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold text-gray-900 dark:text-white min-w-[60px]">
                    {result.confidence}% confidence
                  </span>
                </div>
              </div>

              {/* Details Grid */}
              <div className="space-y-6">
                {/* Symptoms */}
                {result.symptoms && result.symptoms.length > 0 && (
                  <div className="p-4 bg-red-50 dark:bg-red-900/10 rounded-xl">
                    <h4 className="font-semibold text-red-900 dark:text-red-300 mb-3 flex items-center">
                      <Stethoscope className="w-4 h-4 mr-2" />
                      Symptoms
                    </h4>
                    <ul className="space-y-2">
                      {result.symptoms.map((symptom, index) => (
                        <li key={index} className="text-sm text-red-700 dark:text-red-400 flex items-start">
                          <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 mr-2 flex-shrink-0" />
                          <span>{symptom}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Causes */}
                {result.causes && result.causes.length > 0 && (
                  <div className="p-4 bg-amber-50 dark:bg-amber-900/10 rounded-xl">
                    <h4 className="font-semibold text-amber-900 dark:text-amber-300 mb-3 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-2" />
                      Causes
                    </h4>
                    <ul className="space-y-2">
                      {result.causes.map((cause, index) => (
                        <li key={index} className="text-sm text-amber-700 dark:text-amber-400 flex items-start">
                          <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-1.5 mr-2 flex-shrink-0" />
                          <span>{cause}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Prevention Tips */}
                {result.preventionTips && result.preventionTips.length > 0 && (
                  <div className="p-4 bg-emerald-50 dark:bg-emerald-900/10 rounded-xl">
                    <h4 className="font-semibold text-emerald-900 dark:text-emerald-300 mb-3 flex items-center">
                      <Shield className="w-4 h-4 mr-2" />
                      Prevention Tips
                    </h4>
                    <ul className="space-y-2">
                      {result.preventionTips.map((tip, index) => (
                        <li key={index} className="text-sm text-emerald-700 dark:text-emerald-400 flex items-start">
                          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-1.5 mr-2 flex-shrink-0" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Treatment */}
                {result.treatmentSuggestions && result.treatmentSuggestions.length > 0 && (
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-xl">
                    <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-3 flex items-center">
                      <Thermometer className="w-4 h-4 mr-2" />
                      Recommended Treatment
                    </h4>
                    <ul className="space-y-2">
                      {result.treatmentSuggestions.map((treatment, index) => (
                        <li key={index} className="text-sm text-blue-700 dark:text-blue-400 flex items-start">
                          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 mr-2 flex-shrink-0" />
                          <span>{treatment}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={handleRemoveImage}
                  className="w-full btn-primary flex items-center justify-center space-x-2"
                >
                  <ScanLine className="w-5 h-5" />
                  <span>Analyze Another Image</span>
                </button>
              </div>
            </motion.div>
          ) : analysisError ? (
            <div className="card p-6 lg:p-8 text-center border border-red-100 dark:border-red-900/40">
              <div className="w-20 h-20 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-10 h-10 text-red-500" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Analysis Could Not Complete
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                {analysisError}
              </p>
              {selectedFile && (
                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="btn-primary inline-flex items-center justify-center space-x-2 disabled:opacity-70"
                >
                  {isAnalyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : <ScanLine className="w-4 h-4" />}
                  <span>Try Again</span>
                </button>
              )}
            </div>
          ) : (
            /* Empty State */
            <div className="card p-6 lg:p-8 text-center">
              <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No Analysis Yet
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Upload a crop image and click "Analyze Disease" to get AI-powered detection results.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
