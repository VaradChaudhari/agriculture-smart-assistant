import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, ScanLine, AlertTriangle, CheckCircle, Loader2, Droplets, Sun, Thermometer, Wind } from 'lucide-react';
import { diseaseAPI } from '@/services/api';
import { cn, getSeverityColor } from '@/utils/helpers';
import toast from 'react-hot-toast';
import type { DiseaseDetectionResult } from '@/types';

export default function DiseaseDetectionPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DiseaseDetectionResult | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      toast.error('Please upload an image file');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size should be less than 10MB');
      return;
    }
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setResult(null);
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;
    setIsAnalyzing(true);
    try {
      const detectionResult = await diseaseAPI.detectDisease(selectedFile);
      setResult(detectionResult);
      toast.success('Analysis complete!');
    } catch (error) {
      toast.error('Failed to analyze image. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setResult(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">AI Disease Detection</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Upload a crop image to detect diseases using AI technology
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Upload Image</h3>
          
          {!previewUrl ? (
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={cn(
                'border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300',
                dragActive
                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/10'
                  : 'border-gray-300 dark:border-gray-700 hover:border-emerald-400 hover:bg-gray-50 dark:hover:bg-gray-800'
              )}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                className="hidden"
              />
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Drop your image here, or click to browse
              </p>
              <p className="text-sm text-gray-500">
                Supports: JPG, PNG, WEBP (max 10MB)
              </p>
            </div>
          ) : (
            <div className="relative">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-64 object-cover rounded-xl"
              />
              <button
                onClick={handleReset}
                className="absolute top-2 right-2 w-8 h-8 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {previewUrl && !result && (
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="w-full mt-6 btn-primary flex items-center justify-center space-x-2 disabled:opacity-70"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <ScanLine className="w-5 h-5" />
                  <span>Analyze Image</span>
                </>
              )}
            </button>
          )}

          {/* Analyzing Animation */}
          <AnimatePresence>
            {isAnalyzing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-6 p-4 bg-emerald-50 dark:bg-emerald-900/10 rounded-xl"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex space-x-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                        className="w-2 h-2 bg-emerald-500 rounded-full"
                      />
                    ))}
                  </div>
                  <span className="text-sm text-emerald-700 dark:text-emerald-300">
                    AI is analyzing your crop image...
                  </span>
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
              className="card p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Detection Result</h3>
                <span className={cn('px-3 py-1 rounded-full text-sm font-medium', getSeverityColor(result.severity))}>
                  {result.severity.toUpperCase()}
                </span>
              </div>

              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-1">Detected Disease</p>
                <h4 className="text-2xl font-bold text-gray-900 dark:text-white">{result.diseaseName}</h4>
                <div className="flex items-center space-x-2 mt-2">
                  <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full"
                      style={{ width: `${result.confidence}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-emerald-600">{result.confidence}% confidence</span>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white mb-2 flex items-center space-x-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    <span>Symptoms</span>
                  </h5>
                  <ul className="space-y-1">
                    {result.symptoms.map((symptom, index) => (
                      <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-start space-x-2">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1.5" />
                        <span>{symptom}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white mb-2 flex items-center space-x-2">
                    <Sun className="w-4 h-4 text-orange-500" />
                    <span>Causes</span>
                  </h5>
                  <ul className="space-y-1">
                    {result.causes.map((cause, index) => (
                      <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-start space-x-2">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1.5" />
                        <span>{cause}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white mb-2 flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    <span>Prevention Tips</span>
                  </h5>
                  <ul className="space-y-1">
                    {result.preventionTips.map((tip, index) => (
                      <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-start space-x-2">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/10 rounded-xl p-4">
                  <h5 className="font-medium text-blue-900 dark:text-blue-300 mb-2 flex items-center space-x-2">
                    <Thermometer className="w-4 h-4" />
                    <span>Recommended Treatment</span>
                  </h5>
                  <ul className="space-y-1">
                    {result.treatmentSuggestions.map((treatment, index) => (
                      <li key={index} className="text-sm text-blue-700 dark:text-blue-400 flex items-start space-x-2">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5" />
                        <span>{treatment}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="w-full mt-6 btn-secondary"
              >
                Analyze Another Image
              </button>
            </motion.div>
          ) : (
            <div className="card p-6 h-full flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ScanLine className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500">Upload an image to see AI detection results</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
