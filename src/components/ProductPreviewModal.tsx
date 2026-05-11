import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  X, 
  Scan, 
  CloudSun, 
  Users, 
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Sparkles,
  BarChart3,
  Target
} from 'lucide-react';

interface ProductData {
  id: string;
  title: string;
  icon: React.ElementType;
  color: string;
  description: string;
  features: string[];
  stats: { label: string; value: string }[];
  ctaText: string;
}

const productData: Record<string, ProductData> = {
  'ai-disease-detection': {
    id: 'ai-disease-detection',
    title: 'AI Crop Disease Detection',
    icon: Scan,
    color: 'emerald',
    description: 'Advanced AI-powered crop disease detection system that analyzes plant images and provides instant diagnosis with treatment recommendations.',
    features: [
      'Upload crop images for AI analysis',
      'Detect plant diseases instantly',
      'Get confidence-based predictions',
      'Receive treatment suggestions',
      'Monitor crop health using AI',
    ],
    stats: [
      { label: 'AI Accuracy', value: '95%+' },
      { label: 'Diseases Covered', value: '200+' },
      { label: 'Crops Supported', value: '50+' },
    ],
    ctaText: 'Try Disease Detection',
  },
  'smart-weather': {
    id: 'smart-weather',
    title: 'Smart Weather Intelligence',
    icon: CloudSun,
    color: 'blue',
    description: 'Hyper-local weather forecasting system designed specifically for agricultural operations with farming-specific insights.',
    features: [
      'Real-time weather monitoring',
      'Rainfall and humidity forecasts',
      'Temperature tracking',
      'Farming weather insights',
      'Crop planning assistance',
    ],
    stats: [
      { label: 'Forecast Accuracy', value: '95%+' },
      { label: 'Days Ahead', value: '7-Day' },
      { label: 'Locations', value: '28 States' },
    ],
    ctaText: 'Check Weather',
  },
  'expert-consultation': {
    id: 'expert-consultation',
    title: 'Agriculture Expert Consultation',
    icon: Users,
    color: 'amber',
    description: 'Connect with verified agricultural experts for personalized guidance, crop treatment advice, and farming recommendations.',
    features: [
      'Connect with agriculture specialists',
      'Get crop treatment guidance',
      'Expert farming recommendations',
      'Live farming support',
      'Smart crop advisory',
    ],
    stats: [
      { label: 'Expert Network', value: '500+' },
      { label: 'Consultations', value: '50K+' },
      { label: 'Success Rate', value: '98%' },
    ],
    ctaText: 'Find Experts',
  },
  'mandi-rates': {
    id: 'mandi-rates',
    title: 'Live Mandi Market Intelligence',
    icon: TrendingUp,
    color: 'purple',
    description: 'Real-time market price intelligence from 3000+ mandis across India with smart analytics and selling recommendations.',
    features: [
      'Real-time mandi prices',
      'Crop market trends',
      'Regional price comparisons',
      'Smart selling guidance',
      'Market analytics',
    ],
    stats: [
      { label: 'Mandi Coverage', value: '3000+' },
      { label: 'Daily Updates', value: 'Real-time' },
      { label: 'Price Accuracy', value: '99%+' },
    ],
    ctaText: 'Check Mandi Rates',
  },
};

const colorClasses: Record<string, { bg: string; text: string; gradient: string; lightBg: string }> = {
  emerald: {
    bg: 'bg-emerald-500',
    text: 'text-emerald-600',
    gradient: 'from-emerald-500 to-emerald-600',
    lightBg: 'bg-emerald-50',
  },
  blue: {
    bg: 'bg-blue-500',
    text: 'text-blue-600',
    gradient: 'from-blue-500 to-blue-600',
    lightBg: 'bg-blue-50',
  },
  amber: {
    bg: 'bg-amber-500',
    text: 'text-amber-600',
    gradient: 'from-amber-500 to-amber-600',
    lightBg: 'bg-amber-50',
  },
  purple: {
    bg: 'bg-purple-500',
    text: 'text-purple-600',
    gradient: 'from-purple-500 to-purple-600',
    lightBg: 'bg-purple-50',
  },
};

interface ProductPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId: string | null;
}

export default function ProductPreviewModal({ isOpen, onClose, productId }: ProductPreviewModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!productId || !productData[productId]) return null;
  
  const product = productData[productId];
  const colors = colorClasses[product.color];
  const Icon = product.icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center overflow-y-auto bg-black/25 backdrop-blur-[2px] p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/25 backdrop-blur-[2px]"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
            }}
            className="relative w-full max-w-2xl max-h-[92vh] overflow-hidden rounded-3xl bg-white dark:bg-slate-900 shadow-2xl flex flex-col"
          >
            <div className="relative bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-3xl border border-white/20 dark:border-gray-700/50 flex flex-col h-full">
              {/* Header with Gradient */}
              <div className={`flex-shrink-0 bg-gradient-to-r ${colors.gradient} p-6 sm:p-8 relative`}>
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-all duration-200 group"
                >
                  <X className="w-5 h-5 text-white" />
                </button>

                {/* Icon & Title */}
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white">{product.title}</h2>
                    <p className="text-white/80 text-sm mt-1">Premium Feature</p>
                  </div>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-8 sm:py-8 scrollbar-thin scrollbar-thumb-emerald-500">
                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 text-lg mb-6 leading-relaxed">
                  {product.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {product.stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`${colors.lightBg} dark:bg-gray-800 rounded-xl p-4 text-center`}
                    >
                      <div className={`text-2xl font-bold ${colors.text}`}>{stat.value}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Features */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <Sparkles className={`w-5 h-5 ${colors.text} mr-2`} />
                    Key Features
                  </h3>
                  <ul className="space-y-3">
                    {product.features.map((feature, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + index * 0.05 }}
                        className="flex items-start space-x-3"
                      >
                        <div className={`w-6 h-6 ${colors.lightBg} rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5`}>
                          <CheckCircle className={`w-4 h-4 ${colors.text}`} />
                        </div>
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Additional Info */}
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 mb-6">
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <Target className="w-4 h-4" />
                    <span>Join 50,000+ farmers using AgriSmart to improve their yields</span>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="shrink-0 border-t bg-white/95 dark:bg-gray-900/95 p-6 sm:p-8">
                <div className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-800/50 dark:to-gray-900/50 rounded-xl p-4 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <BarChart3 className="w-4 h-4" />
                    <span>Access this feature and more by creating your free account</span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/login"
                    onClick={onClose}
                    className="flex-1 inline-flex items-center justify-center px-6 py-3.5 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
                  >
                    Login to Access
                  </Link>
                  <Link
                    to="/register"
                    onClick={onClose}
                    className={`flex-1 inline-flex items-center justify-center px-6 py-3.5 bg-gradient-to-r ${colors.gradient} text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-${product.color}-500/25 transition-all duration-200 group`}
                  >
                    Create Free Account
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
