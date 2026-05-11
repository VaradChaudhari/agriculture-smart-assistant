import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { Eye, EyeOff, Leaf, Loader2, Mail, Lock, ArrowRight, Shield, User, Sprout } from 'lucide-react';
import toast from 'react-hot-toast';
import { STORAGE_KEYS } from '@/utils/constants';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: localStorage.getItem(STORAGE_KEYS.REMEMBER_ME) || '',
    password: '',
    rememberMe: !!localStorage.getItem(STORAGE_KEYS.REMEMBER_ME),
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginType, setLoginType] = useState<'farmer' | 'admin'>('farmer');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(formData.email, formData.password);
      
      if (formData.rememberMe) {
        localStorage.setItem(STORAGE_KEYS.REMEMBER_ME, formData.email);
      } else {
        localStorage.removeItem(STORAGE_KEYS.REMEMBER_ME);
      }
      
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Login error:', error);
      if (error.code === 'ERR_NETWORK' || error.message?.includes('Network Error')) {
        toast.error('Cannot connect to backend server. Please ensure the backend is running on localhost:5001 or use local development mode.');
      } else if (error.response?.status === 401) {
        toast.error('Invalid email or password. Please try again.');
      } else {
        toast.error(error.response?.data?.message || 'Login failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white dark:bg-gray-900">
      {/* Left Side - Agriculture Themed Banner */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&h=800&fit=crop"
            alt="Farming Landscape"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/90 via-emerald-800/80 to-lime-900/70" />
        </div>
        
        <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
          <div>
            <Link to="/" className="inline-flex items-center space-x-3">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
                <Leaf className="w-8 h-8 text-lime-300" />
              </div>
              <div>
                <span className="text-3xl font-bold">AgriSmart</span>
                <p className="text-emerald-200 text-sm">AI-Powered Agriculture Platform</p>
              </div>
            </Link>
          </div>
          
          <div className="space-y-6">
            <h2 className="text-4xl xl:text-5xl font-bold leading-tight">
              Empowering Farmers<br />
              <span className="text-lime-300">Through Technology</span>
            </h2>
            <p className="text-xl text-emerald-100 max-w-md">
              Join 50,000+ farmers using AI to detect diseases, predict weather, and maximize yields.
            </p>
            
            <div className="flex items-center space-x-6">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-lime-400 to-emerald-400 border-2 border-emerald-800"
                  />
                ))}
              </div>
              <div>
                <p className="font-semibold text-lg">50,000+</p>
                <p className="text-emerald-200">Active Farmers</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {[
              { value: '95%', label: 'AI Accuracy' },
              { value: '28', label: 'States Covered' },
              { value: '3000+', label: 'Mandi Rates' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <p className="text-2xl font-bold text-lime-300">{stat.value}</p>
                <p className="text-sm text-emerald-200">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 lg:p-12 bg-gray-50 dark:bg-gray-900">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Glassmorphism Login Card */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 p-8 lg:p-10">
            {/* Login Type Toggle */}
            <div className="flex p-1 bg-gray-100 dark:bg-gray-700 rounded-xl mb-8">
              <button
                type="button"
                onClick={() => setLoginType('farmer')}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                  loginType === 'farmer'
                    ? 'bg-emerald-500 text-white shadow-lg'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <Sprout className="w-5 h-5" />
                <span>Farmer Login</span>
              </button>
              <Link
                to="/admin/login"
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                  loginType === 'admin'
                    ? 'bg-emerald-500 text-white shadow-lg'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <Shield className="w-5 h-5" />
                <span>Admin Login</span>
              </Link>
            </div>

            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-lime-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/25">
                <User className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Welcome Back
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Sign in to your farmer account
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div className="space-y-2">
                <label 
                  htmlFor="email" 
                  className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label 
                  htmlFor="password" 
                  className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-12 pr-12 py-3.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 cursor-pointer group">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={formData.rememberMe}
                      onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                      className="peer sr-only"
                    />
                    <div className="w-5 h-5 border-2 border-gray-300 dark:border-gray-500 rounded-md peer-checked:bg-emerald-500 peer-checked:border-emerald-500 transition-all" />
                    <svg
                      className="absolute top-1 left-1 w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                    Remember me
                  </span>
                </label>
                <Link 
                  to="#" 
                  className="text-sm font-medium text-emerald-600 hover:text-emerald-500 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4">
                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium text-center mb-2">
                  Farmer Demo Account
                </p>
                <div className="space-y-1">
                  <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                    <span className="font-medium">Email:</span> ramesh@example.com
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                    <span className="font-medium">Password:</span> password123
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                    <span className="font-medium">Name:</span> Ramesh Patel
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                    <span className="font-medium">Role:</span> Farmer
                  </p>
                </div>
                <p className="text-xs text-amber-600 mt-3 text-center">
                  ⚠️ Backend must be running on localhost:5001 for login to work
                </p>
              </div>
            </div>

            {/* Register Link */}
            <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
              Don&apos;t have an account?{' '}
              <Link 
                to="/register" 
                className="font-semibold text-emerald-600 hover:text-emerald-500 transition-colors"
              >
                Create free account
              </Link>
            </p>
          </div>

          {/* Mobile - Back to Home Link */}
          <div className="mt-6 text-center lg:hidden">
            <Link 
              to="/" 
              className="inline-flex items-center space-x-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              <span>Back to home</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
