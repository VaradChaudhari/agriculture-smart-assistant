import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import ProductPreviewModal from '@/components/ProductPreviewModal';

const featuresData = {
  'disease-detection': {
    title: 'AI Disease Detection',
    description: 'Advanced computer vision technology that identifies crop diseases with 95% accuracy using your smartphone camera.',
    benefits: [
      'Early disease detection prevents crop losses up to 60%',
      'Instant results available on your mobile device',
      'Access to treatment recommendations from agricultural experts',
      'Supports over 200+ crop diseases and pest identification',
      'Reduces dependency on chemical pesticides through targeted treatment'
    ],
    howItWorks: [
      'Upload clear photos of affected crops from your smartphone',
      'Our AI analyzes images using advanced computer vision algorithms',
      'Get instant disease identification with confidence scores',
      'Receive personalized treatment recommendations',
      'Connect with agricultural experts for consultation if needed'
    ],
    exampleUsage: 'Farmer Ramesh from Maharashtra uploaded photos of his wheat crop showing yellow spots. Within seconds, our AI identified Wheat Leaf Rust with 92% confidence and recommended specific fungicide treatment. Ramesh saved 30% of his crop by following the early treatment recommendations.',
    ctaText: 'Try Disease Detection',
    ctaLink: '/disease-detection'
  },
  
  'weather-forecasting': {
    title: 'Smart Weather Forecasting',
    description: 'Hyperlocal weather predictions powered by AI, providing accurate forecasts for your specific farm location.',
    benefits: [
      'Get 7-day accurate weather forecasts for your exact location',
      'Receive real-time weather alerts and storm warnings',
      'Plan irrigation schedules based on predicted rainfall',
      'Optimize planting and harvesting times with weather insights',
      'Reduce weather-related crop losses by up to 40%'
    ],
    howItWorks: [
      'Enter your farm location or allow GPS access',
      'Our AI analyzes historical weather patterns for your region',
      'Combine satellite data with local weather station information',
      'Generate hyperlocal forecasts with 95% accuracy',
      'Receive personalized farming recommendations based on weather'
    ],
    exampleUsage: 'Farmer Priya from Gujarat uses our weather forecasting to plan her rice cultivation. The system predicted heavy rainfall in 10 days, allowing her to adjust her irrigation schedule and save 25% on water costs. She also received frost warnings that helped protect her tomato crop.',
    ctaText: 'Check Weather Forecast',
    ctaLink: '/weather'
  },

  'expert-consultation': {
    title: 'Expert Consultation Network',
    description: 'Connect with verified agricultural experts for personalized guidance and solve farming challenges.',
    benefits: [
      'Access to 500+ verified agricultural experts across India',
      'Get one-on-one video consultations with farming specialists',
      'Receive expert advice on crop selection, soil health, and pest management',
      'Schedule on-site farm visits when needed',
      'Join community of farmers sharing knowledge and experiences'
    ],
    howItWorks: [
      'Browse our network of agricultural experts by specialty and location',
      'Book consultations based on your specific farming needs',
      'Choose from video calls, phone calls, or in-person visits',
      'Get personalized advice tailored to your crops and region',
      'Access expert knowledge base with farming best practices'
    ],
    exampleUsage: 'New farmer Vikram from Rajasthan was struggling with pest management in his cotton crop. He connected with Dr. Sharma, an entomology expert, through our platform. The expert provided integrated pest management plan that reduced pesticide use by 45% and increased crop yield by 20%.',
    ctaText: 'Find an Expert',
    ctaLink: '/experts'
  },

  'mandi-rates': {
    title: 'Live Mandi Rates',
    description: 'Real-time market price information from 1000+ mandis across India, helping you get the best prices for your produce.',
    benefits: [
      'Access real-time prices from 1000+ mandis nationwide',
      'Compare prices across different markets and locations',
      'Receive price trend alerts and market insights',
      'Find best selling opportunities with price predictions',
      'Negotiate better prices with market intelligence data'
    ],
    howItWorks: [
      'Select your crop and enter your location',
      'Browse real-time prices from nearby mandis',
      'Compare prices across multiple markets for best rates',
      'Set price alerts for your target selling price',
      'Access historical price trends and market analysis',
      'Connect directly with verified traders and buyers'
    ],
    exampleUsage: 'Farmer Suresh from Madhya Pradesh grows vegetables and sells them at local mandis. Using our platform, he discovered that prices in Indore mandi were 15% higher than in Bhopal. By timing his sales and using our price alerts, he increased his profit margin by 22%.',
    ctaText: 'Check Mandi Rates',
    ctaLink: '/mandi-rates'
  },

  'smart-irrigation': {
    title: 'Smart Irrigation Planning',
    description: 'AI-powered irrigation scheduling that optimizes water usage based on crop needs, weather forecasts, and soil moisture data.',
    benefits: [
      'Save up to 30% on water costs through smart scheduling',
      'Optimize irrigation timing based on crop growth stages',
      'Integrate weather forecasts to prevent over/under watering',
      'Monitor soil moisture levels in real-time',
      'Reduce water waste and improve crop yield sustainability'
    ],
    howItWorks: [
      'Install smart soil moisture sensors in your fields',
      'Connect weather API for local forecast integration',
      'Our AI calculates optimal irrigation schedules',
      'Automate irrigation based on crop water requirements',
      'Monitor water usage and adjust schedules dynamically'
    ],
    exampleUsage: 'Farmer Anil from Karnataka installed our smart irrigation system for his sugarcane crop. The system reduced water consumption by 35% while maintaining optimal soil moisture levels. Anil reports saving ₹50,000 annually on water costs and seeing 15% improvement in crop quality.',
    ctaText: 'Explore Smart Irrigation',
    ctaLink: '/services'
  }
};
import {
  Leaf,
  Scan,
  CloudSun,
  Users,
  TrendingUp,
  Bell,
  ArrowRight,
  Play,
  CheckCircle,
  Award,
  Globe,
  Heart,
  Sparkles,
  MessageSquare,
  Shield,
  Zap,
} from 'lucide-react';
import { cn } from '@/utils/helpers';
import FeatureDetailModal from '@/components/FeatureDetailModal';

const features = [
  {
    icon: Scan,
    title: 'AI Disease Detection',
    description: 'Upload crop photos and get instant disease diagnosis with treatment recommendations powered by advanced AI.',
    color: 'emerald',
  },
  {
    icon: CloudSun,
    title: 'Smart Weather',
    description: 'Hyper-local weather forecasts with farming advisories to optimize your agricultural operations.',
    color: 'blue',
  },
  {
    icon: Users,
    title: 'Expert Consultation',
    description: 'Connect with 500+ agricultural experts for personalized guidance and crop management advice.',
    color: 'amber',
  },
  {
    icon: TrendingUp,
    title: 'Mandi Rates',
    description: 'Real-time market prices from 3000+ mandis across India to maximize your selling potential.',
    color: 'purple',
  },
  {
    icon: Bell,
    title: 'Smart Reminders',
    description: 'Never miss important farming activities with customizable reminders for irrigation, fertilization, and more.',
    color: 'rose',
  },
  {
    icon: Shield,
    title: 'Crop Insurance',
    description: 'Get comprehensive crop insurance recommendations and weather-based insurance alerts.',
    color: 'cyan',
  },
];

const stats = [
  { value: '50,000+', label: 'Active Farmers', icon: Users },
  { value: '1.2M+', label: 'Disease Scans', icon: Scan },
  { value: '3000+', label: 'Mandi Markets', icon: TrendingUp },
  { value: '500+', label: 'Agri Experts', icon: Award },
];

const howItWorks = [
  {
    step: '01',
    title: 'Create Account',
    description: 'Sign up in less than 2 minutes with your mobile number and farm details.',
    icon: Users,
  },
  {
    step: '02',
    title: 'Explore Features',
    description: 'Access AI-powered tools for disease detection, weather forecasting, and market prices.',
    icon: Sparkles,
  },
  {
    step: '03',
    title: 'Get Insights',
    description: 'Receive personalized recommendations and real-time alerts for your crops.',
    icon: Zap,
  },
  {
    step: '04',
    title: 'Maximize Yield',
    description: 'Implement expert advice and increase your farm productivity up to 40%.',
    icon: TrendingUp,
  },
];

const testimonials = [
  {
    name: 'Ramesh Patel',
    role: 'Wheat Farmer, Punjab',
    image: 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=150&h=150&fit=crop',
    content: 'The disease detection feature saved my entire wheat crop. I caught the infection early and got immediate treatment recommendations.',
    rating: 5,
  },
  {
    name: 'Sunita Devi',
    role: 'Rice Farmer, Bihar',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&h=150&fit=crop',
    content: 'Weather forecasts are incredibly accurate. I planned my sowing and harvesting perfectly this season. My yield increased by 35%.',
    rating: 5,
  },
  {
    name: 'Kumaraswamy',
    role: 'Vegetable Grower, Karnataka',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    content: 'Mandi rates help me decide when and where to sell. I no longer get cheated by middlemen. Direct access to market prices is a game changer.',
    rating: 5,
  },
];

const partners = [
  { name: 'Ministry of Agriculture', logo: '🏛️' },
  { name: 'ICAR', logo: '🔬' },
  { name: 'Agri-Cooperative', logo: '🤝' },
  { name: 'Krishi Vigyan Kendra', logo: '🌾' },
  { name: 'Farmers Welfare Board', logo: '🌱' },
  { name: 'Digital India', logo: '💻' },
];

const faqs = [
  {
    question: 'Is the AI disease detection accurate?',
    answer: 'Our AI model has been trained on over 1 million crop images and achieves 95%+ accuracy for common crop diseases. It recognizes 100+ different crop diseases across all major Indian crops.',
  },
  {
    question: 'How often are mandi rates updated?',
    answer: 'Market prices are updated in real-time from official APMC sources. You get the most current rates from over 3000 mandis across India.',
  },
  {
    question: 'Can I consult experts for free?',
    answer: 'Yes! Basic consultation with our AI assistant is completely free. Premium expert consultations with verified agricultural specialists are available at affordable rates.',
  },
  {
    question: 'Is my farm data secure?',
    answer: 'Absolutely. We use bank-grade encryption and never share your personal or farm data with third parties. Your privacy is our top priority.',
  },
  {
    question: 'Which languages are supported?',
    answer: 'Our platform supports 12 Indian languages including Hindi, Marathi, Tamil, Telugu, Kannada, Bengali, Gujarati, and more.',
  },
];

const benefits = [
  'Increased crop yield up to 40%',
  'Reduce crop losses by 60%',
  'Save 50% on input costs',
  'Get 25% better market prices',
  '24/7 expert support',
  'Weather-based alerts',
];

export default function HomePage() {
  const { isAuthenticated, user, isLoading } = useAuth();
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Section 1: Hero */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-lime-50 dark:from-gray-900 dark:via-gray-900 dark:to-emerald-900/20" />
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-emerald-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-lime-400/20 rounded-full blur-3xl" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-full mb-6">
                <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">AI-Powered Agriculture Platform</span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
                Smart Farming for a{' '}
                <span className="text-gradient">Brighter Tomorrow</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-xl">
                Transform your farming with AI-powered disease detection, real-time weather forecasts, expert consultations, and live mandi rates.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {!isAuthenticated && (
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 group"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              )}
              {isAuthenticated && (
                <Link
                  to="/dashboard"
                  className="inline-flex items-center justify-center px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 group"
                >
                  Go to Dashboard
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              )}
                <button className="inline-flex items-center justify-center px-8 py-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold rounded-xl border border-gray-200 dark:border-gray-700 transition-all duration-300">
                  <Play className="mr-2 w-5 h-5" />
                  Watch Demo
                </button>
              </div>
              <div className="flex items-center space-x-8 mt-12">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-lime-400 border-2 border-white dark:border-gray-800"
                    />
                  ))}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">50,000+ Farmers</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Trust AgriSmart</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=600&fit=crop"
                  alt="Smart Farming"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-xl flex items-center justify-center">
                    <Leaf className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">95% Accuracy</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Disease Detection</p>
                  </div>
                </div>
              </motion.div>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 3, delay: 0.5 }}
                className="absolute -top-6 -right-6 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center">
                    <CloudSun className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Live Weather</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">7-Day Forecast</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 2: Stats Banner */}
      <section className="py-16 bg-emerald-600 dark:bg-emerald-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <stat.icon className="w-8 h-8 text-emerald-200 mx-auto mb-3" />
                <p className="text-3xl md:text-4xl font-bold text-white">{stat.value}</p>
                <p className="text-emerald-100 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Features */}
      <section className="py-24 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full text-sm font-medium mb-4">
              Our Features
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Everything You Need to Farm Smarter
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Comprehensive AI-powered tools designed specifically for Indian farmers
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
              >
                <div className={cn('w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110', `bg-${feature.color}-100 dark:bg-${feature.color}-900/30`)}>
                  <feature.icon className={cn('w-7 h-7', `text-${feature.color}-600 dark:text-${feature.color}-400`)} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
                <button
                  onClick={() => {
                    const productKeyMap: { [key: string]: string } = {
                      'AI Disease Detection': 'ai-disease-detection',
                      'Smart Weather': 'smart-weather',
                      'Expert Consultation': 'expert-consultation',
                      'Mandi Rates': 'mandi-rates',
                    };
                    const productKey = productKeyMap[feature.title];
                    if (productKey) {
                      setSelectedProduct(productKey);
                    } else {
                      setSelectedFeature(feature.title.toLowerCase().replace(/\s+/g, '-'));
                    }
                  }}
                  className="inline-flex items-center mt-4 text-emerald-600 dark:text-emerald-400 font-medium hover:text-emerald-700 transition-colors"
                >
                  Learn more <ArrowRight className="ml-1 w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3B: AI Technology */}
      <section className="py-24 bg-gradient-to-br from-emerald-50 via-blue-50 to-white dark:from-gray-800 dark:via-gray-800/50 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium mb-4">
              AI Technology
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Advanced AI-Powered Crop Disease Detection
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Powered by machine learning models trained on 1M+ crop images with 95%+ accuracy
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700"
            >
              <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-6">
                <Scan className="w-7 h-7 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Real-Time Image Analysis</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Instant crop disease diagnosis from uploaded photos. Get results in seconds using state-of-the-art computer vision technology.</p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>95%+ Detection Accuracy</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>100+ Disease Recognition</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700"
            >
              <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center mb-6">
                <Sparkles className="w-7 h-7 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Machine Learning Pipeline</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Continuously improving AI models through deep learning. Trained on diverse crop diseases from across India.</p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>1M+ Training Images</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Continuous Learning</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700"
            >
              <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center mb-6">
                <Zap className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Smart Recommendations</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">AI-generated treatment plans with confidence scoring. Personalized solutions based on detected disease severity.</p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Confidence Scoring</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Treatment Options</span>
                </li>
              </ul>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-emerald-500 to-lime-500 rounded-2xl p-8 lg:p-12 text-white"
          >
            <div className="max-w-3xl">
              <h3 className="text-2xl lg:text-3xl font-bold mb-4">AI Detection Process</h3>
              <div className="grid md:grid-cols-4 gap-6 mb-8">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">1</div>
                  <div>
                    <p className="font-semibold">Upload Image</p>
                    <p className="text-emerald-50 text-sm">Capture crop leaf photo</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">2</div>
                  <div>
                    <p className="font-semibold">AI Analysis</p>
                    <p className="text-emerald-50 text-sm">ML model processes image</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">3</div>
                  <div>
                    <p className="font-semibold">Diagnosis</p>
                    <p className="text-emerald-50 text-sm">Disease detected & scored</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">4</div>
                  <div>
                    <p className="font-semibold">Solutions</p>
                    <p className="text-emerald-50 text-sm">Treatment recommendations</p>
                  </div>
                </div>
              </div>
              <p className="text-emerald-50 mb-6">Early disease prevention leads to 40% higher yields and 60% reduction in crop losses.</p>
              <Link
                to={isAuthenticated ? '/disease-detection' : '/register'}
                className="inline-flex items-center space-x-2 bg-white text-emerald-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-all"
              >
                <span>Try AI Disease Detection</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 4: How It Works */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium mb-4">
              How It Works
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Start Your Smart Farming Journey in 4 Easy Steps
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-emerald-500 to-lime-500" />
                )}
                <div className="bg-gradient-to-br from-emerald-500 to-lime-500 w-24 h-24 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/25">
                  <step.icon className="w-10 h-10 text-white" />
                </div>
                <span className="text-5xl font-bold text-gray-200 dark:text-gray-700 absolute top-0 right-0">
                  {step.step}
                </span>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Benefits */}
      <section className="py-24 bg-emerald-900 dark:bg-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block px-4 py-1 bg-emerald-800 text-emerald-200 rounded-full text-sm font-medium mb-4">
                Why Choose Us
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Trusted by 50,000+ Farmers Across India
              </h2>
              <p className="text-xl text-emerald-100 mb-8">
                Join the agricultural revolution and transform your farming with cutting-edge AI technology.
              </p>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-3 text-white"
                  >
                    <CheckCircle className="w-6 h-6 text-lime-400 flex-shrink-0" />
                    <span className="text-lg">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
              >
                <Globe className="w-10 h-10 text-lime-400 mb-4" />
                <p className="text-3xl font-bold text-white">28</p>
                <p className="text-emerald-200">States Covered</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
              >
                <Heart className="w-10 h-10 text-lime-400 mb-4" />
                <p className="text-3xl font-bold text-white">12</p>
                <p className="text-emerald-200">Indian Languages</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
              >
                <MessageSquare className="w-10 h-10 text-lime-400 mb-4" />
                <p className="text-3xl font-bold text-white">50K+</p>
                <p className="text-emerald-200">Daily Consultations</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
              >
                <Award className="w-10 h-10 text-lime-400 mb-4" />
                <p className="text-3xl font-bold text-white">15+</p>
                <p className="text-emerald-200">Awards Won</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Testimonials */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium mb-4">
              Testimonials
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              What Farmers Say About Us
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-amber-400">★</span>
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">&ldquo;{testimonial.content}&rdquo;</p>
                <div className="flex items-center space-x-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: Partners */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 dark:text-gray-400 mb-8 text-sm uppercase tracking-wider font-medium">
            Trusted by Government & Agricultural Organizations
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <span className="text-2xl">{partner.logo}</span>
                <span className="font-medium">{partner.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 8: FAQ */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-full text-sm font-medium mb-4">
              FAQ
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{faq.question}</h3>
                <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 9: CTA */}
      <section className="py-24 bg-gradient-to-br from-emerald-600 to-lime-500 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Farming?
            </h2>
            <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
              Join 50,000+ farmers who are already using AgriSmart to increase their yield and income. Start your free trial today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {!isAuthenticated ? (
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-emerald-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              ) : (
                <Link
                  to="/dashboard"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-emerald-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
                >
                  Go to Dashboard
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              )}
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-emerald-700 text-white font-semibold rounded-xl hover:bg-emerald-800 transition-colors border border-emerald-500"
              >
                Contact Sales
              </Link>
            </div>
            <p className="mt-6 text-emerald-100 text-sm">No credit card required • Free 14-day trial</p>
          </motion.div>
        </div>
      </section>

      {/* Feature Detail Modal */}
      {selectedFeature && (
        <FeatureDetailModal
          isOpen={selectedFeature !== null}
          onClose={() => setSelectedFeature(null)}
          feature={featuresData[selectedFeature as keyof typeof featuresData]}
        />
      )}

      {/* Product Preview Modal */}
      <ProductPreviewModal
        isOpen={selectedProduct !== null}
        onClose={() => setSelectedProduct(null)}
        productId={selectedProduct}
      />
    </div>
  );
}
