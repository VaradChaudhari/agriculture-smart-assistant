import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Book, MessageCircle, Phone, Mail, ChevronRight, HelpCircle, Video, FileText, Users } from 'lucide-react';

const helpCategories = [
  {
    title: 'Getting Started',
    icon: Book,
    description: 'Learn the basics of Agriculture Smart Assistant',
    articles: [
      'How to create an account',
      'Setting up your farm profile',
      'Understanding your dashboard',
      'Mobile app guide'
    ]
  },
  {
    title: 'Disease Detection',
    icon: HelpCircle,
    description: 'Everything about AI-powered crop disease analysis',
    articles: [
      'How to upload images for analysis',
      'Understanding disease detection results',
      'Common crop diseases and symptoms',
      'Treatment recommendations guide'
    ]
  },
  {
    title: 'Weather & Forecasting',
    icon: Video,
    description: 'Weather insights and planning tools',
    articles: [
      'Reading weather forecasts',
      'Planning irrigation based on weather',
      'Understanding weather alerts',
      'Seasonal planning guide'
    ]
  },
  {
    title: 'Expert Consultation',
    icon: Users,
    description: 'Connect with agricultural experts',
    articles: [
      'How to book an expert consultation',
      'Preparing for consultation calls',
      'Expert specialties explained',
      'Follow-up and support'
    ]
  },
  {
    title: 'Mandi Rates',
    icon: FileText,
    description: 'Market prices and trading information',
    articles: [
      'Understanding market rates',
      'Price trend analysis',
      'Best selling practices',
      'Market timing strategies'
    ]
  }
];

const popularArticles = [
  {
    title: 'Complete Guide to Disease Detection',
    category: 'Disease Detection',
    readTime: '5 min read',
    views: '12.5k'
  },
  {
    title: 'Getting Started with Smart Farming',
    category: 'Getting Started',
    readTime: '3 min read',
    views: '8.2k'
  },
  {
    title: 'Understanding Weather Alerts',
    category: 'Weather & Forecasting',
    readTime: '4 min read',
    views: '6.7k'
  }
];

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredCategories = helpCategories.filter(category =>
    category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Help Center
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Find answers to your questions about Agriculture Smart Assistant
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-2xl mx-auto mt-8"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for help articles..."
                className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Popular Articles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            Popular Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularArticles.map((article, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                    {article.category}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {article.readTime}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {article.title}
                </h3>
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>{article.views} views</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Help Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            Browse by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all cursor-pointer"
                  onClick={() => setSelectedCategory(selectedCategory === category.title ? null : category.title)}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center mr-4">
                      <Icon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${
                      selectedCategory === category.title ? 'rotate-90' : ''
                    }`} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {category.description}
                  </p>
                  
                  {selectedCategory === category.title && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-gray-200 dark:border-gray-700 pt-4"
                    >
                      <ul className="space-y-2">
                        {category.articles.map((article, articleIndex) => (
                          <li
                            key={articleIndex}
                            className="text-sm text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer transition-colors"
                          >
                            • {article}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 bg-gradient-to-r from-emerald-50 to-lime-50 dark:from-emerald-900/20 dark:to-lime-900/20 rounded-2xl p-8"
        >
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Still Need Help?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Our support team is here to help you with any questions or issues
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <MessageCircle className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Live Chat
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Chat with our support team
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Mail className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Email Support
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  support@agriculture-smart.in
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Phone className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Phone Support
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  +91 1800-123-4567
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
