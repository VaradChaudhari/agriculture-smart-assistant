import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Mail, 
  Users, 
  Briefcase, 
  Code, 
  Brain, 
  Palette, 
  BarChart3, 
  ArrowRight,
  CheckCircle,
  Clock,
  MapPin,
  Star,
  Target,
  BookOpen,
  Heart,
  ShieldCheck
} from 'lucide-react';

interface CareerRole {
  title: string;
  department: string;
  experience: string;
  location: string;
  skills: string[];
  technologies: string[];
  employment: string;
}

const careerRoles: CareerRole[] = [
  {
    title: 'Frontend Developer',
    department: 'Engineering',
    experience: '2+ Years',
    location: 'Remote / Hybrid',
    skills: ['React.js', 'TypeScript', 'Tailwind CSS', 'State Management'],
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    employment: 'Full-time'
  },
  {
    title: 'Backend Developer',
    department: 'Engineering',
    experience: '3+ Years',
    location: 'Remote / Delhi',
    skills: ['Node.js', 'Python', 'Database Design', 'API Development'],
    technologies: ['Node.js', 'Python', 'PostgreSQL', 'AWS'],
    employment: 'Full-time'
  },
  {
    title: 'AI/ML Engineer',
    department: 'AI & Data',
    experience: '3+ Years',
    location: 'Bangalore / Hyderabad',
    skills: ['Machine Learning', 'Computer Vision', 'Python', 'TensorFlow'],
    technologies: ['Python', 'TensorFlow', 'PyTorch', 'OpenCV'],
    employment: 'Full-time'
  },
  {
    title: 'Agriculture Expert',
    department: 'Content & Expertise',
    experience: '5+ Years',
    location: 'Remote',
    skills: ['Agricultural Science', 'Crop Management', 'Research', 'Communication'],
    technologies: ['Research Tools', 'Data Analysis', 'Content Creation'],
    employment: 'Full-time / Part-time'
  },
  {
    title: 'UI/UX Designer',
    department: 'Design',
    experience: '2+ Years',
    location: 'Remote / Mumbai',
    skills: ['UI Design', 'UX Research', 'Figma', 'Mobile Design'],
    technologies: ['Figma', 'Adobe XD', 'Prototyping Tools'],
    employment: 'Full-time'
  },
  {
    title: 'Data Analyst',
    department: 'AI & Data',
    experience: '2+ Years',
    location: 'Remote / Bangalore',
    skills: ['SQL', 'Python', 'Data Visualization', 'Statistical Analysis'],
    technologies: ['SQL', 'Python', 'Tableau', 'PowerBI'],
    employment: 'Full-time'
  }
];

const getIconForDepartment = (department: string) => {
  switch (department) {
    case 'Engineering': return Code;
    case 'AI & Data': return Brain;
    case 'Design': return Palette;
    case 'Content & Expertise': return BookOpen;
    default: return Briefcase;
  }
};

interface CareersPopupModalProps {
  isOpen: boolean;
  onClose: () => void;
  popupType: 'openRoles' | 'talkTalent' | 'applicationInstructions' | 'contactHiring' | 'currentPositions' | null;
}

export default function CareersPopupModal({ isOpen, onClose, popupType }: CareersPopupModalProps) {
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

  if (!isOpen || !popupType) return null;

  const renderContent = () => {
    switch (popupType) {
      case 'openRoles':
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-lime-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">Open Career Opportunities</h2>
              <p className="text-gray-600 dark:text-gray-300">Join our team and help transform agriculture with AI technology</p>
            </div>
            
            <div className="grid gap-4 max-h-96 overflow-y-auto pr-2">
              {careerRoles.map((role, index) => {
                const Icon = getIconForDepartment(role.department);
                return (
                  <motion.div
                    key={role.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 bg-gray-50 dark:bg-gray-800"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white">{role.title}</h3>
                        <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {role.location}
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {role.experience}
                          </span>
                          <span className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded text-xs">
                            {role.employment}
                          </span>
                        </div>
                        <div className="mt-2">
                          <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Key Skills:</p>
                          <div className="flex flex-wrap gap-1">
                            {role.skills.slice(0, 3).map((skill) => (
                              <span key={skill} className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            
            <div className="bg-gradient-to-r from-emerald-50 to-lime-50 dark:from-emerald-900/20 dark:to-lime-900/20 rounded-xl p-4">
              <p className="text-sm text-gray-700 dark:text-gray-300 text-center">
                Send your resume to <strong>careers@agriculture-smart.in</strong> with your preferred role
              </p>
            </div>
          </div>
        );

      case 'talkTalent':
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">Talk to Our Talent Team</h2>
              <p className="text-gray-600 dark:text-gray-300">Learn about our culture, growth opportunities, and hiring process</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Heart className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Team Collaboration Culture</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Work with passionate experts in AI, agriculture, and product design</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Target className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Career Growth Opportunities</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Clear career paths with mentorship and skill development programs</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Star className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Remote Work Options</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Flexible work environment with optional in-person collaboration</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Brain className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Innovation-Focused Environment</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Work on cutting-edge AI solutions that impact millions of farmers</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-4">
              <div className="text-center">
                <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Hiring Contact</p>
                <a href="mailto:talent@agriculture-smart.in" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                  talent@agriculture-smart.in
                </a>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                  Send your resume and portfolio along with your preferred role
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <strong>Response Timeline:</strong> Within 24-48 business hours
              </p>
            </div>
          </div>
        );

      case 'applicationInstructions':
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">Application Instructions</h2>
              <p className="text-gray-600 dark:text-gray-300">Follow these steps to apply for any position at AgriSmart</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">How to Apply</h3>
                <ol className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li className="flex items-start space-x-2">
                    <span className="w-5 h-5 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-amber-600 dark:text-amber-400">1</span>
                    <span>Review the open positions and identify roles matching your skills</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-5 h-5 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-amber-600 dark:text-amber-400">2</span>
                    <span>Prepare your updated resume and portfolio</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-5 h-5 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-amber-600 dark:text-amber-400">3</span>
                    <span>Email your application to careers@agriculture-smart.in</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-5 h-5 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-amber-600 dark:text-amber-400">4</span>
                    <span>Our team will review and respond within 48 hours</span>
                  </li>
                </ol>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Resume Requirements</h3>
                <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>Updated resume with work experience and projects</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>Portfolio or GitHub link for technical roles</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>LinkedIn profile (recommended)</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Technical Evaluation Process</h3>
                <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>Initial screening call (30 minutes)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>Technical assessment or portfolio review</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>Final interview with team members</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-4">
              <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Eligibility Requirements</p>
              <ul className="space-y-1 text-xs text-gray-600 dark:text-gray-300">
                <li>• Strong communication and collaboration skills</li>
                <li>• Relevant technical experience for the role</li>
                <li>• Passion for AI and agriculture innovation</li>
                <li>• Ability to work in a fast-paced environment</li>
              </ul>
            </div>
            
            <div className="text-center bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
              <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Send your application to:</p>
              <a href="mailto:careers@agriculture-smart.in" className="text-emerald-600 dark:text-emerald-400 hover:underline font-medium">
                careers@agriculture-smart.in
              </a>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Please include: Updated Resume, Portfolio/GitHub/LinkedIn, Preferred Role, Years of Experience
              </p>
            </div>
          </div>
        );

      case 'contactHiring':
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">Contact Hiring Team</h2>
              <p className="text-gray-600 dark:text-gray-300">Get support with your application and recruitment process</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Users className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">HR Support</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Dedicated HR team to guide you through the hiring process</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-pink-100 dark:bg-pink-900/30 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Target className="w-4 h-4 text-pink-600 dark:text-pink-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Recruitment Process Guidance</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Clear information about each step of our hiring process</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Clock className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Interview Scheduling Support</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Flexible scheduling options for candidates across time zones</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Star className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Internship Opportunities</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Learn about our internship programs for students and fresh graduates</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-4">
              <div className="text-center">
                <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">HR Contact Email</p>
                <a href="mailto:hr@agriculture-smart.in" className="text-emerald-600 dark:text-emerald-400 hover:underline font-medium">
                  hr@agriculture-smart.in
                </a>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                  Expected response time: Within 24–48 business hours
                </p>
              </div>
            </div>
          </div>
        );

      case 'currentPositions':
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">Current Open Positions</h2>
              <p className="text-gray-600 dark:text-gray-300">Explore our available career opportunities</p>
            </div>
            
            <div className="grid gap-4 max-h-96 overflow-y-auto pr-2">
              {careerRoles.map((role, index) => {
                const Icon = getIconForDepartment(role.department);
                return (
                  <motion.div
                    key={role.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border border-gray-200 dark:border-gray-700 rounded-xl p-5 bg-white dark:bg-gray-800 shadow-sm"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
                          <Icon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">{role.title}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{role.department}</p>
                        </div>
                      </div>
                      <span className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded text-xs font-medium">
                        {role.employment}
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <MapPin className="w-3 h-3 mr-2 text-gray-400" />
                        {role.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <Clock className="w-3 h-3 mr-2 text-gray-400" />
                        {role.experience}
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Technologies:</p>
                      <div className="flex flex-wrap gap-1">
                        {role.technologies.map((tech) => (
                          <span key={tech} className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-gray-700 dark:text-gray-300">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl p-4">
              <div className="text-center">
                <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Apply for any position</p>
                <a href="mailto:jobs@agriculture-smart.in" className="text-emerald-600 dark:text-emerald-400 hover:underline font-medium">
                  jobs@agriculture-smart.in
                </a>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                  Mention the role title in your email subject
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

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
              type: "spring",
              stiffness: 300,
              damping: 30
            }}
            className="relative w-full max-w-3xl max-h-[92vh] overflow-hidden rounded-3xl bg-white dark:bg-slate-900 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex-shrink-0 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-emerald-500 to-lime-500 p-6 sm:p-8 relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-all duration-200"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
            
            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-8 sm:py-8">
              {renderContent()}
            </div>
            
            {/* Footer */}
            <div className="shrink-0 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-6">
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  Close
                </button>
                {(popupType === 'openRoles' || popupType === 'currentPositions') && (
                  <a
                    href="mailto:careers@agriculture-smart.in"
                    onClick={onClose}
                    className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-lime-500 text-white font-medium rounded-xl hover:shadow-lg transition-all"
                  >
                    Send Resume
                    <Mail className="ml-2 w-4 h-4" />
                  </a>
                )}
                {(popupType === 'talkTalent' || popupType === 'contactHiring') && (
                  <a
                    href="mailto:talent@agriculture-smart.in"
                    onClick={onClose}
                    className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-xl hover:shadow-lg transition-all"
                  >
                    Contact HR
                    <Mail className="ml-2 w-4 h-4" />
                  </a>
                )}
                {popupType === 'applicationInstructions' && (
                  <a
                    href="mailto:careers@agriculture-smart.in"
                    onClick={onClose}
                    className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium rounded-xl hover:shadow-lg transition-all"
                  >
                    Apply Now
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
