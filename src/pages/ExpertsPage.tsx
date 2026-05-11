import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Star, Calendar, X, CheckCircle, Filter, Clock, Languages, ArrowRight } from 'lucide-react';
import { mockExperts } from '@/data/mockData';
import { useAuth } from '@/context/AuthContext';
import { expertsAPI } from '@/services/api';
import { cn, formatCurrency } from '@/utils/helpers';
import toast from 'react-hot-toast';

export default function ExpertsPage() {
  const { isAuthenticated, user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExpert, setSelectedExpert] = useState<any>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    date: '',
    time: '',
    cropType: '',
    issueDescription: '',
  });

  const filteredExperts = mockExperts.filter((expert) =>
    expert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    expert.specialization.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleBookConsultation = (expert: any) => {
    if (!isAuthenticated) {
      toast.error('Please login to book a consultation');
      return;
    }
    setSelectedExpert(expert);
    setIsBookingModalOpen(true);
  };

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await expertsAPI.bookConsultation({
        expertId: selectedExpert.id,
        farmerId: user?.id || '',
        scheduledDate: bookingForm.date,
        scheduledTime: bookingForm.time,
        issueDescription: bookingForm.issueDescription,
        cropType: bookingForm.cropType,
      });
      toast.success('Consultation request submitted successfully!');
      setIsBookingModalOpen(false);
      setBookingForm({ date: '', time: '', cropType: '', issueDescription: '' });
    } catch (error) {
      toast.error('Failed to submit consultation request. Please try again.');
    }
  };

  return (
    <div className="px-6 lg:px-8 py-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Expert Consultation</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Connect with agricultural experts for personalized guidance
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search experts by name or specialization..."
            className="input pl-10"
          />
        </div>
        <button className="btn-secondary flex items-center justify-center space-x-2">
          <Filter className="w-5 h-5" />
          <span>Filters</span>
        </button>
      </div>

      {/* Experts Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExperts.map((expert, index) => (
          <motion.div
            key={expert.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card p-6"
          >
            <div className="flex items-start space-x-4">
              <img
                src={expert.avatar}
                alt={expert.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white">{expert.name}</h3>
                <p className="text-sm text-gray-500">{expert.education}</p>
                <div className="flex items-center space-x-1 mt-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{expert.rating}</span>
                  <span className="text-sm text-gray-500">({expert.totalConsultations} consultations)</span>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{expert.bio}</p>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {expert.specialization.slice(0, 2).map((spec, i) => (
                <span key={i} className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 text-xs rounded-full">
                  {spec}
                </span>
              ))}
              {expert.specialization.length > 2 && (
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                  +{expert.specialization.length - 2} more
                </span>
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Consultation Fee</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">{formatCurrency(expert.consultationFee)}</p>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <span className={cn(
                    'w-2 h-2 rounded-full',
                    expert.availability === 'available' && 'bg-emerald-500',
                    expert.availability === 'busy' && 'bg-yellow-500',
                    expert.availability === 'offline' && 'bg-gray-400'
                  )} />
                  <span className="capitalize text-gray-600 dark:text-gray-400">{expert.availability}</span>
                </div>
              </div>

              <button
                onClick={() => handleBookConsultation(expert)}
                disabled={expert.availability === 'offline'}
                className="w-full mt-4 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Book Consultation
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Booking Modal */}
      <AnimatePresence>
        {isBookingModalOpen && selectedExpert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start sm:items-center justify-center overflow-y-auto bg-black/50 backdrop-blur-sm p-4"
            onClick={() => setIsBookingModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md max-h-[92vh] overflow-hidden rounded-3xl bg-white dark:bg-slate-900 shadow-2xl flex flex-col"
            >
              <div className="shrink-0 flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Book Consultation</h3>
                <button
                  onClick={() => setIsBookingModalOpen(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-6 scrollbar-thin scrollbar-thumb-emerald-500">
                <div className="flex items-center space-x-3 mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <img src={selectedExpert.avatar} alt={selectedExpert.name} className="w-12 h-12 rounded-full" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{selectedExpert.name}</p>
                    <p className="text-sm text-gray-500">{formatCurrency(selectedExpert.consultationFee)} / session</p>
                  </div>
                </div>

                <form id="booking-form" onSubmit={handleSubmitBooking} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      required
                      value={bookingForm.date}
                      onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                      className="input"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Preferred Time
                    </label>
                    <select
                      required
                      value={bookingForm.time}
                      onChange={(e) => setBookingForm({ ...bookingForm, time: e.target.value })}
                      className="input"
                    >
                      <option value="">Select time slot</option>
                      <option value="09:00">09:00 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="14:00">02:00 PM</option>
                      <option value="15:00">03:00 PM</option>
                      <option value="16:00">04:00 PM</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Crop Type
                    </label>
                    <select
                      required
                      value={bookingForm.cropType}
                      onChange={(e) => setBookingForm({ ...bookingForm, cropType: e.target.value })}
                      className="input"
                    >
                      <option value="">Select crop type</option>
                      <option value="wheat">Wheat</option>
                      <option value="rice">Rice</option>
                      <option value="cotton">Cotton</option>
                      <option value="sugarcane">Sugarcane</option>
                      <option value="vegetables">Vegetables</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Describe Your Issue
                    </label>
                    <textarea
                      required
                      value={bookingForm.issueDescription}
                      onChange={(e) => setBookingForm({ ...bookingForm, issueDescription: e.target.value })}
                      className="input min-h-[100px] resize-none"
                      placeholder="Describe the problem you're facing with your crop..."
                    />
                  </div>
                </form>
              </div>

              <div className="shrink-0 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
                <button type="submit" form="booking-form" className="w-full btn-primary">
                  Confirm Booking
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Guest Preview CTA */}
      {!isAuthenticated && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-8 text-white text-center"
        >
          <h3 className="text-2xl font-bold mb-3">Book Expert Consultations</h3>
          <p className="text-amber-50 mb-6">Get personalized farming advice from our network of 500+ verified agricultural experts across India</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!isAuthenticated ? (
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-amber-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                <span>Create Free Account</span>
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            ) : (
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-amber-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                <span>Go to Dashboard</span>
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            )}
            <Link
              to="/login"
              className="inline-flex items-center justify-center px-6 py-3 bg-white/20 text-white font-semibold rounded-lg hover:bg-white/30 transition-colors border border-white/30"
            >
              Login
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
}
