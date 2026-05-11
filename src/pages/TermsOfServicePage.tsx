import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Shield, AlertTriangle, Calendar, ChevronDown, ChevronRight, CheckCircle, X } from 'lucide-react';

const termsSections = [
  {
    title: 'Acceptance of Terms',
    icon: CheckCircle,
    content: 'By accessing and using Agriculture Smart Assistant, you accept and agree to be bound by these Terms of Service.',
    details: [
      'These terms constitute a legally binding agreement',
      'You must be at least 18 years old to use our services',
      'Continued use constitutes acceptance of any modifications',
      'Violation may result in termination of your account'
    ]
  },
  {
    title: 'Service Description',
    icon: FileText,
    content: 'Agriculture Smart Assistant provides AI-powered tools and services for farmers.',
    details: [
      'Disease detection using computer vision and AI',
      'Weather forecasting and agricultural insights',
      'Expert consultation platform',
      'Market price information and analysis',
      'Farm management and planning tools'
    ]
  },
  {
    title: 'User Responsibilities',
    icon: Shield,
    content: 'Users are responsible for their use of the platform and compliance with applicable laws.',
    details: [
      'Provide accurate and complete information',
      'Maintain security of your account credentials',
      'Use services for legitimate agricultural purposes',
      'Respect intellectual property rights',
      'Report any security vulnerabilities or issues'
    ]
  },
  {
    title: 'Prohibited Activities',
    icon: X,
    content: 'Certain activities are strictly prohibited on our platform.',
    details: [
      'Unauthorized access to other users accounts',
      'Distribution of malware or harmful code',
      'Spam, harassment, or abusive behavior',
      'Misrepresentation of identity or credentials',
      'Violation of agricultural laws and regulations'
    ]
  },
  {
    title: 'Intellectual Property',
    icon: Shield,
    content: 'All content and technology on our platform is protected by intellectual property laws.',
    details: [
      'We retain all rights to our software and algorithms',
      'User-generated content remains property of the user',
      'Limited license to use our services is granted',
      'No rights to reverse engineer or copy our technology',
      'Trademarks and logos are our exclusive property'
    ]
  },
  {
    title: 'Limitation of Liability',
    icon: AlertTriangle,
    content: 'Our liability is limited as described in these terms.',
    details: [
      'Services provided "as is" without warranties',
      'Not liable for agricultural decisions made using our platform',
      'Maximum liability limited to subscription fees paid',
      'Not responsible for third-party service interruptions',
      'No liability for consequential or indirect damages'
    ]
  }
];

const termsHistory = [
  {
    date: 'January 15, 2024',
    changes: 'Updated liability limitations and added AI service terms'
  },
  {
    date: 'October 1, 2023',
    changes: 'Added expert consultation terms and payment policies'
  },
  {
    date: 'June 15, 2023',
    changes: 'Initial terms of service publication'
  }
];

export default function TermsOfServicePage() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  const toggleSection = (title: string) => {
    setExpandedSection(expandedSection === title ? null : title);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <FileText className="w-16 h-16 text-emerald-600 dark:text-emerald-400 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Terms of Service
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              These terms govern your use of Agriculture Smart Assistant services and platform.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
              Last updated: January 15, 2024
            </p>
          </motion.div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {['overview', 'terms', 'user-responsibilities', 'policy-history'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === tab
                    ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                {tab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Agreement to Terms
              </h2>
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Welcome to Agriculture Smart Assistant. These Terms of Service ("Terms") govern your access to and use of 
                  our agricultural technology platform, services, and website (collectively, the "Service").
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-4">
                  By creating an account, accessing our platform, or using our services, you agree to be bound by these 
                  Terms and our Privacy Policy. If you do not agree to these Terms, you may not access or use our Service.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {termsSections.map((section, index) => {
                const Icon = section.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
                  >
                    <div
                      className="flex items-center mb-4 cursor-pointer"
                      onClick={() => toggleSection(section.title)}
                    >
                      <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center mr-4">
                        <Icon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex-1">
                        {section.title}
                      </h3>
                      {expandedSection === section.title ? (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {section.content}
                    </p>
                    
                    {expandedSection === section.title && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-gray-200 dark:border-gray-700 pt-4"
                      >
                        <ul className="space-y-2">
                          {section.details.map((detail, detailIndex) => (
                            <li
                              key={detailIndex}
                              className="flex items-start text-sm text-gray-600 dark:text-gray-400"
                            >
                              <div className="w-2 h-2 bg-emerald-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
                              {detail}
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
        )}

        {activeTab === 'terms' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Detailed Terms and Conditions
            </h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  1. Account Registration and Security
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  You must provide accurate, complete, and current information during registration. You are responsible for 
                  safeguarding your account credentials and for all activities under your account.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  2. Service Availability and Modifications
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We reserve the right to modify, suspend, or discontinue any part of our Service at any time. 
                  We are not liable for any modification, suspension, or discontinuation of the Service.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  3. Payment and Subscription Terms
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Paid services require valid payment method. You agree to pay all charges incurred under your account. 
                  All fees are non-refundable unless otherwise specified.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  4. Confidentiality and Data Protection
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We implement appropriate security measures to protect your information. However, we cannot guarantee 
                  absolute security of data transmission over the internet.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'user-responsibilities' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              User Responsibilities and Conduct
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Acceptable Use
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  You agree to use our Service only for lawful purposes and in accordance with these Terms. 
                  You shall not use our Service to:
                </p>
                <ul className="mt-3 space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Violate any applicable laws or regulations</li>
                  <li>• Infringe upon intellectual property rights</li>
                  <li>• Upload malicious code or harmful content</li>
                  <li>• Interfere with or disrupt the Service</li>
                  <li>• Attempt to gain unauthorized access</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Content Standards
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  You are responsible for all content you upload, share, or create using our Service. 
                  Content must not be:
                </p>
                <ul className="mt-3 space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Unlawful, harmful, or offensive</li>
                  <li>• Defamatory, libelous, or abusive</li>
                  <li>• In violation of privacy rights</li>
                  <li>• Misleading or fraudulent</li>
                  <li>• In violation of agricultural regulations</li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'policy-history' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Terms History
            </h2>
            <div className="space-y-4">
              {termsHistory.map((item, index) => (
                <div key={index} className="flex items-start pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0">
                  <Calendar className="w-5 h-5 text-gray-400 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {item.date}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      {item.changes}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
