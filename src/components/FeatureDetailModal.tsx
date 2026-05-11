import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';

interface FeatureDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  feature: {
    title: string;
    description: string;
    benefits: string[];
    howItWorks: string[];
    exampleUsage: string;
    ctaText: string;
    ctaLink: string;
  };
}

export default function FeatureDetailModal({ isOpen, onClose, feature }: FeatureDetailModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-start sm:items-center justify-center overflow-y-auto bg-black/50 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl max-h-[92vh] overflow-hidden rounded-3xl bg-white dark:bg-slate-900 shadow-2xl flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex-shrink-0 relative p-6 pb-0 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-lime-500 rounded-xl flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {feature.title}
                </h2>
                <p className="text-emerald-600 dark:text-emerald-400 font-medium">
                  Advanced AI Technology
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 py-6 scrollbar-thin scrollbar-thumb-emerald-500">
            {/* Description */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                What is {feature.title}?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>

            {/* Benefits */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Key Benefits
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {feature.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-400">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* How It Works */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                How It Works
              </h3>
              <div className="space-y-3">
                {feature.howItWorks.map((step, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                        {index + 1}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 flex-1">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Example Usage */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Example Usage
              </h3>
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {feature.exampleUsage}
                </p>
                <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                  <span>Real-world example from our farmers</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="shrink-0 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Ready to Transform Your Farming?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Join thousands of farmers already using {feature.title} to increase yields and reduce losses.
                </p>
              </div>
              <button
                onClick={() => {
                  if (feature.ctaLink.startsWith('/')) {
                    window.location.href = feature.ctaLink;
                  } else {
                    window.open(feature.ctaLink, '_blank');
                  }
                  onClose();
                }}
                className="flex items-center px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors"
              >
                {feature.ctaText}
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
