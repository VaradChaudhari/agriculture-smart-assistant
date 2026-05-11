import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Phone, MapPin, Linkedin, Twitter, Calendar, Award } from 'lucide-react';

interface TeamMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: {
    name: string;
    position: string;
    bio: string;
    experience: string;
    expertise: string[];
    image: string;
    email?: string;
    phone?: string;
    location?: string;
    linkedin?: string;
    twitter?: string;
    achievements?: string[];
  } | null;
}

export default function TeamMemberModal({ isOpen, onClose, member }: TeamMemberModalProps) {
  if (!isOpen || !member) return null;

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
          className="relative w-full max-w-2xl max-h-[92vh] overflow-hidden rounded-3xl bg-white dark:bg-slate-900 shadow-2xl flex flex-col"
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
              <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {member.name}
                </h2>
                <p className="text-emerald-600 dark:text-emerald-400 font-medium">
                  {member.position}
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 py-6 scrollbar-thin scrollbar-thumb-emerald-500">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              {/* Experience */}
              <div className="lg:col-span-1">
                <div className="flex items-center mb-3">
                  <Calendar className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Experience
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  {member.experience}
                </p>
              </div>

              {/* Expertise */}
              <div className="lg:col-span-1">
                <div className="flex items-center mb-3">
                  <Award className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Expertise
                  </h3>
                </div>
                <div className="space-y-2">
                  {member.expertise.map((skill, index) => (
                    <div
                      key={index}
                      className="inline-block bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <div className="lg:col-span-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Contact
                </h3>
                <div className="space-y-3">
                  {member.email && (
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 text-gray-400 mr-3" />
                      <a
                        href={`mailto:${member.email}`}
                        className="text-emerald-600 dark:text-emerald-400 hover:underline text-sm"
                      >
                        {member.email}
                      </a>
                    </div>
                  )}
                  {member.phone && (
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 text-gray-400 mr-3" />
                      <a
                        href={`tel:${member.phone}`}
                        className="text-emerald-600 dark:text-emerald-400 hover:underline text-sm"
                      >
                        {member.phone}
                      </a>
                    </div>
                  )}
                  {member.location && (
                    <div className="flex items-start">
                      <MapPin className="w-4 h-4 text-gray-400 mr-3 mt-1 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-400 text-sm">
                        {member.location}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Biography */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Biography
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {member.bio}
              </p>
            </div>

            {/* Achievements */}
            {member.achievements && member.achievements.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Key Achievements
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {member.achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg"
                    >
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {achievement}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Social Links */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Connect with {member.name.split(' ')[0]}
                </span>
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
                {member.twitter && (
                  <a
                    href={member.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="shrink-0 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
