import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import {
  Leaf,
  Target,
  Heart,
  Globe,
  Award,
  Users,
  TrendingUp,
  Shield,
  CheckCircle,
  ArrowRight,
  Quote,
  Sparkles,
  Lightbulb,
  Sprout,
  Scan,
  Zap,
} from 'lucide-react';
import TeamMemberModal from '@/components/TeamMemberModal';

const milestones = [
  { year: '2019', title: 'Founded', description: 'Started with a vision to digitize Indian agriculture' },
  { year: '2020', title: 'First AI Model', description: 'Launched crop disease detection with 85% accuracy' },
  { year: '2021', title: '10,000 Farmers', description: 'Reached first major milestone of active users' },
  { year: '2022', title: 'Mandi Integration', description: 'Connected with 1000+ APMC markets across India' },
  { year: '2023', title: 'Expert Network', description: 'Built network of 500+ agricultural experts' },
  { year: '2024', title: '50,000+ Farmers', description: 'Became India\'s fastest growing agri-tech platform' },
];

const values = [
  {
    icon: Heart,
    title: 'Farmer First',
    description: 'Every decision we make starts with the farmer\'s wellbeing in mind.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'We constantly push boundaries to bring cutting-edge technology to farms.',
  },
  {
    icon: Shield,
    title: 'Trust & Integrity',
    description: 'We maintain the highest standards of data privacy and ethical practices.',
  },
  {
    icon: Globe,
    title: 'Accessibility',
    description: 'Technology should reach every farmer, regardless of location or language.',
  },
];

const team = [
  {
    name: 'Dr. Rajesh Kumar',
    position: 'Founder & CEO',
    bio: 'PhD in Agricultural Sciences, IIT Kharagpur. 20+ years in agri-tech.',
    experience: '20+ years in agricultural technology and AI research',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop',
    email: 'rajesh.kumar@agriculture-smart.in',
    phone: '+91 9876543210',
    location: 'Pune, Maharashtra',
    linkedin: 'https://linkedin.com/in/rajeshkumar',
    twitter: 'https://twitter.com/rajeshkumar',
    expertise: ['Agricultural AI', 'Crop Science', 'Business Strategy'],
    achievements: ['Founded Agriculture Smart Assistant', 'PhD in Agricultural Sciences', '20+ years experience']
  },
  {
    name: 'Priya Sharma',
    position: 'Co-Founder & CTO',
    bio: 'Former Google AI Lead. Expert in computer vision and machine learning.',
    experience: '15+ years in AI research and development',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop',
    email: 'priya.sharma@agriculture-smart.in',
    phone: '+91 9876543211',
    location: 'Bangalore, Karnataka',
    linkedin: 'https://linkedin.com/in/priyasharma',
    twitter: 'https://twitter.com/priyasharma',
    expertise: ['Computer Vision', 'Machine Learning', 'AI Research'],
    achievements: ['Built AI disease detection model', 'Google AI Team Lead', '15+ years in tech']
  },
  {
    name: 'Arun Patel',
    position: 'Head of Operations',
    bio: 'MBA from IIM Ahmedabad. 15+ years scaling agri-business operations.',
    experience: '15+ years in operations management and business scaling',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
    email: 'arun.patel@agriculture-smart.in',
    phone: '+91 9876543212',
    location: 'Ahmedabad, Gujarat',
    linkedin: 'https://linkedin.com/in/arunpatel',
    twitter: 'https://twitter.com/arunpatel',
    expertise: ['Operations Management', 'Business Development', 'Supply Chain'],
    achievements: ['Scaled operations to 50+ cities', 'MBA from IIM', 'Expert in agricultural logistics']
  },
  {
    name: 'Dr. Sunita Devi',
    position: 'Chief Agri-Scientist',
    bio: 'PhD from ICAR. Expert in crop pathology and sustainable farming.',
    experience: '25+ years in agricultural research and crop science',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop',
    email: 'sunita.devi@agriculture-smart.in',
    phone: '+91 9876543213',
    location: 'New Delhi, Delhi',
    linkedin: 'https://linkedin.com/in/sunitadevi',
    twitter: 'https://twitter.com/sunitadevi',
    expertise: ['Crop Pathology', 'Sustainable Farming', 'Research & Development'],
    achievements: ['Published 50+ research papers', 'ICAR Scientist', '25+ years research experience']
  },
  {
    name: 'Vikram Singh',
    position: 'Head of Engineering',
    bio: 'Ex-Microsoft Principal Engineer. Built scalable systems for 100M+ users.',
    experience: '20+ years engineering experience and team leadership',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop',
    email: 'vikram.singh@agriculture-smart.in',
    phone: '+91 9876543214',
    location: 'Hyderabad, Telangana',
    linkedin: 'https://linkedin.com/in/vikramsingh',
    twitter: 'https://twitter.com/vikramsingh',
    expertise: ['Cloud Architecture', 'System Design', 'Team Leadership'],
    achievements: ['Built scalable platform', 'Ex-Microsoft Principal', '20+ years engineering experience']
  },
  {
    name: 'Meera Reddy',
    position: 'VP of Customer Success',
    bio: 'Expert in rural outreach. Led farmer training programs across 15 states.',
    experience: '18+ years in customer success and agricultural outreach',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop',
    email: 'meera.reddy@agriculture-smart.in',
    phone: '+91 9876543215',
    location: 'Chennai, Tamil Nadu',
    linkedin: 'https://linkedin.com/in/meerareddy',
    twitter: 'https://twitter.com/meerareddy',
    expertise: ['Customer Success', 'Rural Outreach', 'Training Programs'],
    achievements: ['Trained 100K+ farmers', 'Led 15 state programs', 'Expert in agricultural education']
  },
];

const achievements = [
  { icon: Award, title: 'Best Agri-Tech Startup 2023', org: 'Ministry of Agriculture' },
  { icon: Globe, title: 'Digital India Champion', org: 'NITI Aayog' },
  { icon: Sprout, title: 'Sustainability Award', org: 'UN FAO' },
  { icon: TrendingUp, title: 'Fastest Growing Agri-Platform', org: 'Economic Times' },
];

const testimonials = [
  {
    content: 'AgriSmart has transformed how we approach farming. The AI disease detection saved my cotton crop worth ₹5 lakhs.',
    author: 'Gurpreet Singh',
    role: 'Cotton Farmer, Punjab',
  },
  {
    content: 'The mandi rates feature alone has helped me get 20% better prices for my produce. No more middlemen cheating us.',
    author: 'Lakshmi Narayan',
    role: 'Vegetable Farmer, Karnataka',
  },
];

const stats = [
  { value: '50,000+', label: 'Registered Farmers', suffix: '' },
  { value: '1.2', label: 'Million Crops Analyzed', suffix: 'M+' },
  { value: '95', label: 'Disease Detection Accuracy', suffix: '%' },
  { value: '3000+', label: 'Mandi Markets Connected', suffix: '' },
  { value: '28', label: 'States Covered', suffix: '' },
  { value: '500+', label: 'Agri Experts', suffix: '' },
];

const partnerships = [
  { name: 'Indian Council of Agricultural Research', type: 'Research Partner' },
  { name: 'Ministry of Agriculture & Farmers Welfare', type: 'Government Partner' },
  { name: 'NABARD', type: 'Financial Partner' },
  { name: 'Krishi Vigyan Kendras', type: 'Field Partner' },
  { name: 'State Agricultural Universities', type: 'Knowledge Partner' },
  { name: 'Farmer Producer Organizations', type: 'Community Partner' },
];

export default function AboutPage() {
  const { isAuthenticated } = useAuth();
  const [selectedMember, setSelectedMember] = useState<typeof team[0] | null>(null);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Section 1: Hero Banner */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-emerald-900 via-emerald-800 to-lime-700 overflow-hidden">
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
              <Leaf className="w-5 h-5 text-lime-300" />
              <span className="text-lime-100 font-medium">Empowering Farmers Since 2019</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Building the Future of<br />
              <span className="text-lime-300">Indian Agriculture</span>
            </h1>
            <p className="text-xl text-emerald-100 max-w-3xl mx-auto mb-8">
              We&apos;re on a mission to democratize agricultural technology and empower every farmer with AI-powered tools for better yields and sustainable farming.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section 2: Mission & Vision */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full text-sm font-medium mb-4">
                Our Mission
              </span>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Democratizing Agricultural Technology for Every Farmer
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Founded in 2019, AgriSmart emerged from a simple observation: despite India being an agricultural powerhouse, millions of farmers lacked access to basic technological tools that could transform their productivity and income.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                We envisioned a platform where AI, machine learning, and data analytics would be as accessible to a small farmer in rural Bihar as they are to large agribusinesses. Today, we&apos;re proud to serve over 50,000 farmers across 28 states.
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-lime-400 border-2 border-white dark:border-gray-800"
                    />
                  ))}
                </div>
                <span className="text-gray-600 dark:text-gray-300">Join 50,000+ farmers</span>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="bg-emerald-50 dark:bg-emerald-900/20 p-6 rounded-2xl">
                    <Target className="w-10 h-10 text-emerald-600 dark:text-emerald-400 mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Our Mission</h3>
                    <p className="text-gray-600 dark:text-gray-300">Empower 10 million farmers with AI technology by 2030</p>
                  </div>
                  <div className="bg-lime-50 dark:bg-lime-900/20 p-6 rounded-2xl">
                    <Sparkles className="w-10 h-10 text-lime-600 dark:text-lime-400 mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Our Vision</h3>
                    <p className="text-gray-600 dark:text-gray-300">A world where every farmer thrives through technology</p>
                  </div>
                </div>
                <div className="space-y-6 mt-12">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl">
                    <Globe className="w-10 h-10 text-blue-600 dark:text-blue-400 mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Our Reach</h3>
                    <p className="text-gray-600 dark:text-gray-300">28 states, 12 languages, one mission</p>
                  </div>
                  <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-2xl">
                    <Sprout className="w-10 h-10 text-amber-600 dark:text-amber-400 mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Our Impact</h3>
                    <p className="text-gray-600 dark:text-gray-300">40% average yield increase for our users</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 3: Statistics */}
      <section className="py-20 bg-emerald-600 dark:bg-emerald-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <p className="text-3xl md:text-4xl font-bold text-white">{stat.value}</p>
                <p className="text-emerald-100 mt-1 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3B: AI Technology & Innovation */}
      <section className="py-24 bg-gradient-to-br from-blue-50 via-emerald-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium mb-4">
              Our AI Innovation
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              How Our AI Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We've built proprietary machine learning systems specifically trained for Indian crops and diseases
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Scan className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">1M+ Training Images</h3>
                    <p className="text-gray-600 dark:text-gray-300">Our AI is trained on over 1 million crop leaf images from across India, covering diverse growing conditions and disease variations.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">95%+ Accuracy</h3>
                    <p className="text-gray-600 dark:text-gray-300">Our deep learning models achieve 95%+ accuracy in disease detection, recognizing 100+ different crop diseases with confidence scoring.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Smart Treatment Engine</h3>
                    <p className="text-gray-600 dark:text-gray-300">AI generates personalized treatment recommendations based on disease type, severity, local climate, and available resources.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-gradient-to-br from-emerald-500 to-lime-500 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Early Disease Prevention</h3>
                <p className="mb-6 text-emerald-50">By detecting diseases early, our AI helps farmers:</p>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    <span>Reduce crop losses by 60%</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    <span>Increase yields by 40%</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    <span>Save 50% on input costs</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    <span>Get market-leading prices</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-2xl">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Continuous Learning</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">Our AI improves daily through user feedback and new data, making it smarter for predicting and preventing crop diseases.</p>
                <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 font-semibold">
                  <span>Real-time model updates</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 4: Journey Timeline */}
      <section className="py-24 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium mb-4">
              Our Journey
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Milestones That Define Us
            </h2>
          </div>
          <div className="relative">
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-emerald-500 to-lime-500" />
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
                      <span className="inline-block px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full text-sm font-bold mb-2">
                        {milestone.year}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{milestone.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-lime-500 rounded-full border-4 border-white dark:border-gray-800 z-10 my-4 md:my-0 shadow-lg" />
                  <div className="w-full md:w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Core Values */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium mb-4">
              What Drives Us
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              These principles guide every decision we make and every feature we build
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 p-8 rounded-2xl hover:shadow-xl transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-lime-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: Team */}
      <section className="py-24 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-full text-sm font-medium mb-4">
              Our People
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Meet the Leadership Team
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Passionate experts committed to transforming agriculture
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedMember(member)}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white">{member.name}</h3>
                    <p className="text-emerald-300">{member.position}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 dark:text-gray-300">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: Achievements */}
      <section className="py-24 bg-emerald-900 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-emerald-800 text-emerald-200 rounded-full text-sm font-medium mb-4">
              Recognition
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Awards & Achievements
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20 text-center"
              >
                <achievement.icon className="w-12 h-12 text-lime-400 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-white mb-1">{achievement.title}</h3>
                <p className="text-emerald-200 text-sm">{achievement.org}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 8: Testimonials */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 rounded-full text-sm font-medium mb-4">
              Farmer Stories
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Impact We&apos;ve Created
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-emerald-50 to-lime-50 dark:from-gray-800 dark:to-gray-700 p-8 rounded-2xl relative"
              >
                <Quote className="w-10 h-10 text-emerald-300 absolute top-4 left-4" />
                <p className="text-gray-700 dark:text-gray-300 text-lg italic mb-6 pl-8">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-lime-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">{testimonial.author.charAt(0)}</span>
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold text-gray-900 dark:text-white">{testimonial.author}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 9: Partnerships */}
      <section className="py-24 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 rounded-full text-sm font-medium mb-4">
              Collaborations
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Our Partners
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Working together with government bodies and organizations to serve farmers better
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partnerships.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700"
              >
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center mr-4">
                  <Shield className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{partner.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{partner.type}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 10: CTA */}
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
              Join Our Mission to Transform Agriculture
            </h2>
            <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
              Be part of the agricultural revolution. Together, we can empower millions of farmers with technology.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {!isAuthenticated ? (
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-emerald-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
                >
                  Join as Farmer
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
                Partner with Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Member Modal */}
      <TeamMemberModal
        isOpen={selectedMember !== null}
        onClose={() => setSelectedMember(null)}
        member={selectedMember}
      />
    </div>
  );
}
