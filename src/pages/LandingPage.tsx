import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import {
  Leaf,
  ScanLine,
  CloudSun,
  Users,
  TrendingUp,
  Bell,
  ArrowRight,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Star,
  Play,
} from 'lucide-react';
import { cn } from '@/utils/helpers';

const features = [
  {
    icon: ScanLine,
    title: 'AI Disease Detection',
    description: 'Upload crop images and get instant AI-powered disease diagnosis with treatment recommendations.',
    color: 'bg-blue-500',
  },
  {
    icon: CloudSun,
    title: 'Weather Forecasting',
    description: 'Accurate weather predictions and agricultural advisories for better crop planning.',
    color: 'bg-amber-500',
  },
  {
    icon: Users,
    title: 'Expert Consultation',
    description: 'Connect with agricultural experts for personalized advice and guidance.',
    color: 'bg-emerald-500',
  },
  {
    icon: TrendingUp,
    title: 'Mandi Rates',
    description: 'Real-time market prices for crops to help you sell at the best rates.',
    color: 'bg-purple-500',
  },
  {
    icon: Bell,
    title: 'Smart Reminders',
    description: 'Never miss important farming activities with automated reminders.',
    color: 'bg-pink-500',
  },
  {
    icon: Leaf,
    title: 'Crop Management',
    description: 'Comprehensive tools to manage your entire farming operation efficiently.',
    color: 'bg-lime-500',
  },
];

const stats = [
  { value: '50,000+', label: 'Active Farmers' },
  { value: '1,20,000+', label: 'Disease Scans' },
  { value: '25,000+', label: 'Expert Consultations' },
  { value: '98%', label: 'Satisfaction Rate' },
];

const howItWorks = [
  {
    step: '01',
    title: 'Create Account',
    description: 'Sign up for free and set up your farm profile in minutes.',
  },
  {
    step: '02',
    title: 'Upload Images',
    description: 'Take photos of your crops and upload them for AI analysis.',
  },
  {
    step: '03',
    title: 'Get Insights',
    description: 'Receive instant results and actionable recommendations.',
  },
  {
    step: '04',
    title: 'Connect with Experts',
    description: 'Consult with agricultural experts for personalized guidance.',
  },
];

const testimonials = [
  {
    name: 'Ramesh Patel',
    role: 'Wheat Farmer, Gujarat',
    content: 'The AI disease detection saved my entire wheat crop. Early detection helped me take immediate action and prevent major losses.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
  },
  {
    name: 'Lakshmi Devi',
    role: 'Rice Farmer, Andhra Pradesh',
    content: 'Mandi rates feature helps me decide the best time to sell. Ive increased my income by 25% since using this platform.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
  },
  {
    name: 'Suresh Kumar',
    role: 'Cotton Farmer, Maharashtra',
    content: 'Expert consultations are incredibly valuable. The specialists provide practical advice that actually works in the field.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
  },
];

const faqs = [
  {
    question: 'How accurate is the AI disease detection?',
    answer: 'Our AI model has been trained on over 100,000 crop images and achieves an accuracy rate of 95%+ for common crop diseases.',
  },
  {
    question: 'Is the platform free to use?',
    answer: 'Basic features like disease detection and weather forecasts are free. Premium features like expert consultations have affordable pricing.',
  },
  {
    question: 'Which crops are supported?',
    answer: 'We support all major crops including wheat, rice, cotton, sugarcane, vegetables, and fruits. New crops are added regularly.',
  },
  {
    question: 'How do I consult with experts?',
    answer: 'Simply book an appointment through the Experts section. You can choose based on specialization, experience, and availability.',
  },
];

export default function LandingPage() {
  const { isAuthenticated } = useAuth();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-lime-50 dark:from-gray-900 dark:via-gray-900 dark:to-emerald-900/20" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-400/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-lime-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse" />
                AI-Powered Agriculture Platform
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold text-gray-900 dark:text-white leading-tight mb-6">
                Smart Farming with{' '}
                <span className="text-gradient">AI Technology</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                Detect crop diseases, track weather, consult experts, and maximize your yields with our intelligent agriculture platform.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                {!isAuthenticated ? (
                  <Link to="/register" className="btn-primary flex items-center space-x-2 text-lg">
                    <span>Get Started Free</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                ) : (
                  <Link to="/dashboard" className="btn-primary flex items-center space-x-2 text-lg">
                    <span>Go to Dashboard</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                )}
                <button className="btn-secondary flex items-center space-x-2">
                  <Play className="w-5 h-5" />
                  <span>Watch Demo</span>
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-16 relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&h=600&fit=crop"
                  alt="Smart Farming Dashboard"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-emerald-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <p className="text-3xl md:text-4xl font-bold text-white">{stat.value}</p>
                <p className="text-emerald-100 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">
              Everything You Need for Smart Farming
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Our comprehensive platform provides all the tools you need to manage your farm efficiently and increase productivity.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-6 hover:scale-105 transition-transform duration-300"
              >
                <div className={cn('w-14 h-14 rounded-xl flex items-center justify-center mb-4', feature.color)}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 lg:py-32 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Get started with Agriculture Smart Assistant in four simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <span className="text-6xl font-bold text-emerald-100 dark:text-emerald-900/30 absolute -top-4 -left-2">
                  {step.step}
                </span>
                <div className="relative pt-8">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
                </div>
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-emerald-300" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">
              What Farmers Say
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Join thousands of farmers who have transformed their farming with our platform
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-6"
              >
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-6">{testimonial.content}</p>
                <div className="flex items-center space-x-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 lg:py-32 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Got questions? We have answers.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-semibold text-gray-900 dark:text-white">{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gradient-to-br from-emerald-500 to-lime-500 rounded-3xl p-12 lg:p-16 text-center overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl" />
            </div>
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                Ready to Transform Your Farming?
              </h2>
              <p className="text-lg text-emerald-100 mb-8 max-w-2xl mx-auto">
                Join thousands of farmers using AI technology to increase yields and reduce losses.
              </p>
              {!isAuthenticated ? (
                <Link
                  to="/register"
                  className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-emerald-600 font-semibold rounded-xl hover:bg-emerald-50 transition-colors"
                >
                  <span>Get Started Free</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              ) : (
                <Link
                  to="/dashboard"
                  className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-emerald-600 font-semibold rounded-xl hover:bg-emerald-50 transition-colors"
                >
                  <span>Go to Dashboard</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
