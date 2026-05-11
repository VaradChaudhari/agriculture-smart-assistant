import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { Eye, EyeOff, Shield, Lock, ArrowRight, User, Sprout, BarChart3, Users } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminLoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { adminLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await adminLogin(formData.email, formData.password);
      navigate('/admin/dashboard');
    } catch (error) {
      toast.error('Invalid admin credentials');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-900">
      {/* Left Side - Admin Dashboard Preview */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900" />
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300ff88' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
          <div>
            <Link to="/" className="inline-flex items-center space-x-3">
              <div className="w-14 h-14 bg-emerald-500/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-emerald-500/30">
                <Shield className="w-8 h-8 text-emerald-400" />
              </div>
              <div>
                <span className="text-3xl font-bold">Admin Portal</span>
                <p className="text-gray-400 text-sm">Agriculture Smart Assistant</p>
              </div>
            </Link>
          </div>
          
          <div className="space-y-8">
            <h2 className="text-4xl xl:text-5xl font-bold leading-tight">
              Manage the Future<br />
              <span className="text-emerald-400">of Agriculture</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-md">
              Access powerful analytics, manage users, monitor platform performance, and drive agricultural transformation.
            </p>

            {/* Dashboard Preview Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Users, value: '50K+', label: 'Active Users' },
                { icon: BarChart3, value: '1.2M', label: 'Scans/Day' },
                { icon: Sprout, value: '95%', label: 'Accuracy' },
              ].map((stat, index) => (
                <div key={stat.label} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
                  <stat.icon className="w-6 h-6 text-emerald-400 mb-2" />
                  <p className="text-xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-gray-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <p className="font-semibold text-white mb-1">Secure Admin Access</p>
                <p className="text-sm text-gray-400">Role-based permissions • Audit logs • Two-factor authentication</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 lg:p-12 bg-gray-900">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Glassmorphism Login Card */}
          <div className="bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-700 p-8 lg:p-10">
            {/* Login Type Toggle */}
            <div className="flex p-1 bg-gray-900 rounded-xl mb-8">
              <Link
                to="/login"
                className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium text-gray-400 hover:text-white transition-all duration-300"
              >
                <Sprout className="w-5 h-5" />
                <span>Farmer Login</span>
              </Link>
              <button
                type="button"
                className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium bg-emerald-600 text-white shadow-lg"
              >
                <Shield className="w-5 h-5" />
                <span>Admin Login</span>
              </button>
            </div>

            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/25">
                <User className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                Admin Sign In
              </h2>
              <p className="text-gray-400">
                Access the management dashboard
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div className="space-y-2">
                <label 
                  htmlFor="email" 
                  className="block text-sm font-semibold text-gray-300"
                >
                  Admin Email
                </label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-emerald-400 transition-colors">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-900 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-200"
                    placeholder="admin@example.com"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label 
                  htmlFor="password" 
                  className="block text-sm font-semibold text-gray-300"
                >
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-emerald-400 transition-colors">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-12 pr-12 py-3.5 bg-gray-900 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-200"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 focus:outline-none transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Login as Admin</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 pt-6 border-t border-gray-700">
              <div className="bg-gradient-to-r from-emerald-900/30 to-lime-900/30 rounded-xl p-4 border border-emerald-500/30">
                <div className="flex items-center justify-center space-x-2 mb-3">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  <p className="text-xs text-emerald-400 font-bold uppercase tracking-wider">
                    Demo Credentials
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-center space-x-2 bg-gray-900/50 rounded-lg px-3 py-2">
                    <span className="text-gray-500 text-xs">Email:</span>
                    <span className="text-emerald-300 text-sm font-mono">admin@agriculture-smart.in</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 bg-gray-900/50 rounded-lg px-3 py-2">
                    <span className="text-gray-500 text-xs">Password:</span>
                    <span className="text-lime-300 text-sm font-mono">admin123</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 text-center mt-3">
                  Use these credentials to test the admin dashboard
                </p>
              </div>
            </div>

            {/* Back Link */}
            <p className="mt-6 text-center text-sm text-gray-500">
              <Link to="/login" className="inline-flex items-center space-x-2 text-emerald-500 hover:text-emerald-400 font-medium transition-colors">
                <ArrowRight className="w-4 h-4 rotate-180" />
                <span>Back to Farmer Login</span>
              </Link>
            </p>
          </div>

          {/* Mobile - Back to Home Link */}
          <div className="mt-6 text-center lg:hidden">
            <Link 
              to="/" 
              className="inline-flex items-center space-x-2 text-sm text-gray-500 hover:text-gray-300"
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
