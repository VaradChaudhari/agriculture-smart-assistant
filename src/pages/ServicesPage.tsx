import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import FeatureDetailModal from '@/components/FeatureDetailModal';
import { featuresData } from '@/data/featureData';
import {
  Scan,
  CloudSun,
  Users,
  TrendingUp,
  Bell,
  Sprout,
  Shield,
  BookOpen,
  Smartphone,
  Globe,
  Headphones,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Zap,
  Target,
  Award,
  Leaf,
  Microscope,
} from 'lucide-react';

const mainServices = [
  {
    icon: Scan,
    title: 'AI Disease Detection',
    shortDesc: 'Instant crop diagnosis with 95% accuracy',
    description: 'Our advanced AI analyzes crop images to identify diseases, pests, and nutrient deficiencies within seconds. Get detailed treatment recommendations, preventive measures, and connect with experts if needed.',
    features: ['95%+ detection accuracy', '100+ disease types covered', 'Treatment recommendations', 'Offline mode available', 'Multi-language support'],
    color: 'emerald',
    link: '/disease-detection',
  },
  {
    icon: CloudSun,
    title: 'Smart Weather Forecasts',
    shortDesc: 'Hyper-local weather with farming advisories',
    description: 'Get accurate weather forecasts tailored for your location with specific farming advisories. Plan irrigation, spraying, harvesting, and other activities with confidence.',
    features: ['7-day detailed forecast', 'Hourly updates', 'Rain alerts', 'Farming advisories', 'Historical weather data'],
    color: 'blue',
    link: '/weather',
  },
  {
    icon: Users,
    title: 'Expert Consultation',
    shortDesc: 'Connect with 500+ agricultural experts',
    description: 'Book consultations with verified agricultural experts, scientists, and progressive farmers. Get personalized advice on crop management, disease control, and modern farming techniques.',
    features: ['Video consultations', 'Chat support', 'Expert verification', 'Multi-specialty experts', 'Affordable pricing'],
    color: 'amber',
    link: '/experts',
  },
  {
    icon: TrendingUp,
    title: 'Live Mandi Rates',
    shortDesc: 'Real-time prices from 3000+ markets',
    description: 'Access real-time commodity prices from Agricultural Produce Market Committees (APMCs) across India. Compare prices, track trends, and make informed selling decisions.',
    features: ['3000+ mandi coverage', 'Price trend charts', 'Commodity tracking', 'Arrival information', 'Export prices'],
    color: 'purple',
    link: '/mandi-rates',
  },
  {
    icon: Bell,
    title: 'Smart Reminders',
    shortDesc: 'Never miss important farming activities',
    description: 'Set customizable reminders for irrigation, fertilization, pesticide application, harvesting, and more. Get notifications via SMS, WhatsApp, or app alerts.',
    features: ['Custom reminders', 'SMS notifications', 'WhatsApp integration', 'Voice alerts', 'Shared family access'],
    color: 'rose',
    link: '/reminders',
  },
  {
    icon: Sprout,
    title: 'Crop Management',
    shortDesc: 'Complete crop lifecycle management',
    description: 'Track your crops from sowing to harvest. Get stage-wise advisories, input recommendations, and yield predictions based on your farm data.',
    features: ['Crop tracking', 'Stage advisories', 'Input calculator', 'Yield prediction', 'Cost analysis'],
    color: 'green',
    link: '/dashboard',
  },
];

const additionalServices = [
  {
    icon: Shield,
    title: 'Crop Insurance',
    description: 'Get weather-based insurance alerts and recommendations for Pradhan Mantri Fasal Bima Yojana and other schemes.',
  },
  {
    icon: BookOpen,
    title: 'Knowledge Hub',
    description: 'Access thousands of articles, videos, and guides on modern farming techniques, government schemes, and best practices.',
  },
  {
    icon: Smartphone,
    title: 'Offline Mode',
    description: 'Access critical features even without internet. Perfect for farmers in remote areas with connectivity issues.',
  },
  {
    icon: Globe,
    title: 'Multi-language Support',
    description: 'Use the app in 12 Indian languages including Hindi, Marathi, Tamil, Telugu, Kannada, and more.',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Our dedicated support team is available round the clock to help you with any queries or technical issues.',
  },
  {
    icon: Microscope,
    title: 'Soil Testing',
    description: 'Book soil testing services and get detailed analysis reports with customized fertilizer recommendations.',
  },
];

const processSteps = [
  {
    icon: Target,
    title: 'Choose Service',
    description: 'Select from our comprehensive range of AI-powered agricultural services tailored for Indian farmers.',
  },
  {
    icon: Smartphone,
    title: 'Easy Access',
    description: 'Access services via mobile app or web platform. Works on basic smartphones with low internet connectivity.',
  },
  {
    icon: Zap,
    title: 'Instant Results',
    description: 'Get real-time insights, recommendations, and alerts. Our AI works in seconds to provide actionable advice.',
  },
  {
    icon: Award,
    title: 'Better Yields',
    description: 'Implement recommendations and see up to 40% increase in productivity and 25% better market prices.',
  },
];

const pricingPlans = [
  {
    name: 'Basic',
    price: 'Free',
    period: 'Forever',
    description: 'Perfect for individual farmers getting started',
    features: [
      '10 disease scans/month',
      '7-day weather forecast',
      'Basic mandi rates',
      '5 reminders',
      'Email support',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Premium',
    price: '₹99',
    period: '/month',
    description: 'For serious farmers who want maximum results',
    features: [
      'Unlimited disease scans',
      '15-day weather forecast',
      'Advanced mandi analytics',
      'Unlimited reminders',
      '2 expert consultations/month',
      'Priority support',
      'Soil testing report',
    ],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'pricing',
    description: 'For farmer groups, FPOs, and agri-businesses',
    features: [
      'Everything in Premium',
      'Multiple farmer accounts',
      'Dedicated account manager',
      'API access',
      'Custom integrations',
      'Bulk consultations',
      'Training sessions',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

const testimonials = [
  {
    quote: 'The disease detection feature is a lifesaver. I saved my entire rice crop by identifying blast disease early.',
    author: 'Ramesh Kumar',
    role: 'Rice Farmer, Bihar',
  },
  {
    quote: 'Mandi rates help me decide when to sell. I got 30% more for my wheat by waiting for the right price.',
    author: 'Gurpreet Singh',
    role: 'Wheat Farmer, Punjab',
  },
  {
    quote: 'The expert consultations are worth every rupee. I learned organic farming techniques that doubled my income.',
    author: 'Lakshmi Patel',
    role: 'Vegetable Farmer, Gujarat',
  },
];

const faqs = [
  {
    question: 'How accurate is the AI disease detection?',
    answer: 'Our AI model achieves 95%+ accuracy for common crop diseases. It has been trained on over 1 million verified crop images and continuously improves with new data.',
  },
  {
    question: 'Can I use these services without internet?',
    answer: 'Yes! Our app has an offline mode for disease detection and weather forecasts. Core features work even with limited connectivity.',
  },
  {
    question: 'How are mandi rates updated?',
    answer: 'We source data directly from official APMC sources and update prices in real-time throughout the day as markets open and close.',
  },
  {
    question: 'Are the expert consultations really with certified experts?',
    answer: 'Absolutely. Every expert on our platform is verified with their credentials checked. We have agri-scientists, university professors, and award-winning progressive farmers.',
  },
  {
    question: 'Can I get a refund if I am not satisfied?',
    answer: 'Yes, we offer a 30-day money-back guarantee for all paid plans. No questions asked.',
  },
];

export default function ServicesPage() {
  const { isAuthenticated } = useAuth();
  const [selectedService, setSelectedService] = useState<string | null>(null);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getServiceKey = (title: string): string => {
    const keyMap: { [key: string]: string } = {
      'AI Disease Detection': 'disease-detection',
      'Smart Weather Forecasts': 'weather-forecasting',
      'Expert Consultation': 'expert-consultation',
      'Live Mandi Rates': 'mandi-rates',
      'Smart Reminders': 'smart-irrigation',
      'Crop Management': 'smart-irrigation',
    };
    return keyMap[title] || '';
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Section 1: Hero Banner */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-emerald-600 via-emerald-700 to-lime-600 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur rounded-full mb-8">
              <Sparkles className="w-5 h-5 text-lime-300" />
              <span className="text-lime-100 font-medium">Comprehensive Agri-Tech Solutions</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              All Services for<br />
              <span className="text-lime-300">Smarter Farming</span>
            </h1>
            <p className="text-xl text-emerald-100 max-w-3xl mx-auto mb-8">
              Everything you need to maximize yields, reduce costs, and connect with markets. One platform, endless possibilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
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
                Talk to Sales
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 2: Main Services Grid */}
      <section className="py-24 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full text-sm font-medium mb-4">
              Core Services
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              AI-Powered Tools for Modern Farming
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Six powerful services designed to transform every aspect of your farming
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mainServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
              >
                <div className={`h-2 bg-${service.color}-500`} />
                <div className="p-8">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-${service.color}-100 dark:bg-${service.color}-900/30`}>
                    <service.icon className={`w-7 h-7 text-${service.color}-600 dark:text-${service.color}-400`} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{service.title}</h3>
                  <p className="text-emerald-600 dark:text-emerald-400 font-medium mb-4">{service.shortDesc}</p>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{service.description}</p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <CheckCircle className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => setSelectedService(getServiceKey(service.title))}
                    className="inline-flex items-center text-emerald-600 dark:text-emerald-400 font-medium hover:text-emerald-700 transition-colors"
                  >
                    Learn more <ArrowRight className="ml-1 w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Additional Services */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium mb-4">
              Additional Services
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              More Ways We Help
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <service.icon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{service.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: How It Works */}
      <section className="py-24 bg-emerald-900 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-emerald-800 text-emerald-200 rounded-full text-sm font-medium mb-4">
              Simple Process
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-emerald-200 max-w-2xl mx-auto">
              Get started in minutes and see results immediately
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-lime-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <step.icon className="w-10 h-10 text-white" />
                </div>
                <span className="text-5xl font-bold text-emerald-700 absolute -mt-32 ml-8">0{index + 1}</span>
                <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                <p className="text-emerald-200">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Pricing */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium mb-4">
              Pricing
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Choose the plan that fits your farming needs
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative rounded-2xl p-8 ${plan.popular ? 'bg-emerald-600 dark:bg-emerald-700 text-white shadow-xl scale-105' : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="px-4 py-1 bg-lime-500 text-white text-sm font-medium rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className={`text-xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline justify-center">
                    <span className={`text-4xl font-bold ${plan.popular ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                      {plan.price}
                    </span>
                    <span className={plan.popular ? 'text-emerald-200' : 'text-gray-500 dark:text-gray-400'}>
                      {plan.period}
                    </span>
                  </div>
                  <p className={`mt-2 text-sm ${plan.popular ? 'text-emerald-100' : 'text-gray-500 dark:text-gray-400'}`}>
                    {plan.description}
                  </p>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className={`flex items-center text-sm ${plan.popular ? 'text-emerald-100' : 'text-gray-600 dark:text-gray-300'}`}>
                      <CheckCircle className={`w-4 h-4 mr-2 flex-shrink-0 ${plan.popular ? 'text-lime-400' : 'text-emerald-500'}`} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/register"
                  className={`block w-full py-3 px-4 rounded-xl font-semibold text-center transition-colors ${
                    plan.popular
                      ? 'bg-white text-emerald-600 hover:bg-gray-100'
                      : 'bg-emerald-600 text-white hover:bg-emerald-700'
                  }`}
                >
                  {plan.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: Testimonials */}
      <section className="py-24 bg-white dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 rounded-full text-sm font-medium mb-4">
              Success Stories
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Farmers Love Our Services
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-emerald-50 to-lime-50 dark:from-gray-800 dark:to-gray-700 p-8 rounded-2xl"
              >
                <Leaf className="w-10 h-10 text-emerald-400 mb-4" />
                <p className="text-gray-700 dark:text-gray-300 text-lg italic mb-6">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{testimonial.author}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: FAQ */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-full text-sm font-medium mb-4">
              FAQ
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Common Questions
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

      {/* Section 8: CTA */}
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
              Join 50,000+ farmers already using AgriSmart. Start your free trial today.
            </p>
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
          </motion.div>
        </div>
      </section>

      {/* Service Detail Modal */}
      {selectedService && (
        <FeatureDetailModal
          isOpen={selectedService !== null}
          onClose={() => setSelectedService(null)}
          feature={featuresData[selectedService as keyof typeof featuresData]}
        />
      )}
    </div>
  );
}
