import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, Lock, Database, FileText, Calendar, ChevronDown, ChevronRight } from 'lucide-react';

const privacySections = [
  {
    title: 'Information We Collect',
    icon: Database,
    content: 'We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support.',
    details: [
      'Personal Information: Name, email address, phone number, and location',
      'Farm Information: Farm size, crop types, and location data',
      'Usage Data: How you interact with our platform and features',
      'Device Information: Browser type, operating system, and IP address',
      'Communications: Emails, chat messages, and support requests'
    ]
  },
  {
    title: 'How We Use Your Information',
    icon: Eye,
    content: 'We use the information we collect to provide, maintain, and improve our services.',
    details: [
      'Service Delivery: To provide disease detection, weather insights, and expert consultations',
      'Personalization: To customize your experience and provide relevant content',
      'Communication: To respond to your inquiries and send important updates',
      'Analytics: To understand usage patterns and improve our platform',
      'Security: To detect fraud and protect our services from abuse'
    ]
  },
  {
    title: 'Information Sharing',
    icon: Shield,
    content: 'We do not sell, trade, or otherwise transfer your personal information to third parties.',
    details: [
      'Service Providers: Only with trusted partners who help operate our platform',
      'Legal Requirements: When required by law or to protect our rights',
      'Business Transfers: In case of merger, acquisition, or sale of assets',
      'Aggregate Data: Non-personal information for research and analytics',
      'Expert Network: Your information shared with agricultural experts for consultations'
    ]
  },
  {
    title: 'Data Security',
    icon: Lock,
    content: 'We implement appropriate security measures to protect your personal information.',
    details: [
      'Encryption: All data is encrypted in transit and at rest',
      'Access Control: Limited access to personal information',
      'Regular Audits: Security assessments and penetration testing',
      'Data Backup: Secure backup systems to prevent data loss',
      'Compliance: Following industry best practices and regulations'
    ]
  },
  {
    title: 'Your Rights',
    icon: FileText,
    content: 'You have certain rights regarding your personal information.',
    details: [
      'Access: Request a copy of your personal information',
      'Correction: Update or correct inaccurate information',
      'Deletion: Request removal of your personal information',
      'Portability: Transfer your data to another service provider',
      'Objection: Restrict processing of your information'
    ]
  }
];

const policyHistory = [
  {
    date: 'January 15, 2024',
    changes: 'Updated data retention policies and added cookie information'
  },
  {
    date: 'October 1, 2023',
    changes: 'Added information about AI-powered disease detection data usage'
  },
  {
    date: 'June 15, 2023',
    changes: 'Initial privacy policy publication'
  }
];

export default function PrivacyPolicyPage() {
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
            <Shield className="w-16 h-16 text-emerald-600 dark:text-emerald-400 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
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
            {['overview', 'data-collection', 'your-rights', 'policy-history'].map((tab) => (
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
                Our Privacy Commitment
              </h2>
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  At Agriculture Smart Assistant, we are committed to protecting your privacy and ensuring the security of your personal information. 
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our 
                  agricultural technology platform.
                </p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-4">
                  By using Agriculture Smart Assistant, you agree to the collection and use of information in accordance with this policy.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {privacySections.map((section, index) => {
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

        {activeTab === 'data-collection' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Data Collection Practices
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Information You Provide
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We collect information you voluntarily provide when using our services, including:
                </p>
                <ul className="mt-3 space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Account registration details (name, email, phone)</li>
                  <li>• Farm profile information (location, size, crops)</li>
                  <li>• Disease detection images and analysis requests</li>
                  <li>• Expert consultation details and communication</li>
                  <li>• Support requests and feedback</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Information We Collect Automatically
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We automatically collect certain information when you use our platform:
                </p>
                <ul className="mt-3 space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Device and browser information</li>
                  <li>• IP address and location data</li>
                  <li>• Usage patterns and interaction data</li>
                  <li>• Performance and diagnostic information</li>
                  <li>• Cookie and similar tracking technologies</li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'your-rights' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Your Data Rights
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Access and Correction
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  You have the right to access your personal information and request corrections to any inaccurate data.
                  We will respond to such requests within 30 days.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Data Portability
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  You can request a copy of your data in a structured, machine-readable format that can be 
                  transferred to another service provider.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Deletion and Restriction
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  You can request deletion of your personal information or restriction of processing under certain circumstances.
                  We will comply unless we have a legitimate interest in retaining the data.
                </p>
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
              Policy History
            </h2>
            <div className="space-y-4">
              {policyHistory.map((item, index) => (
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
