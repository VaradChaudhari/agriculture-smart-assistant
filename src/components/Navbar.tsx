import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import {
  Menu,
  X,
  Leaf,
  Sun,
  Moon,
  User,
  LogOut,
  ChevronDown,
  Bell,
  Settings,
  Home,
  BarChart3,
  Sparkles,
  HelpCircle,
} from 'lucide-react';
import { cn } from '@/utils/helpers';

const publicNavLinks = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Contact', href: '/contact' },
];

const authNavLinks = [
  { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const isActiveLink = (href: string) => {
    if (href === '/' && location.pathname === '/') return true;
    if (href !== '/' && location.pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden lg:flex fixed top-0 left-0 right-0 z-50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50 shadow-sm">
        <div className="max-w-full mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-[72px]">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-lime-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/25 group-hover:shadow-emerald-500/40 transition-all duration-300">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-display font-bold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                Agri<span className="text-emerald-500 dark:text-emerald-400">Smart</span>
              </span>
            </Link>

            {/* Navigation Links */}
            <div className="flex items-center space-x-1">
              {/* Public Links */}
              {publicNavLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 whitespace-nowrap flex items-center space-x-2",
                    isActiveLink(link.href)
                      ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 shadow-sm shadow-emerald-500/20"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800/50"
                  )}
                >
                  {link.icon && <link.icon className="w-4 h-4" />}
                  <span className="relative inline-flex items-center">
                    <span>{link.name}</span>
                    {isActiveLink(link.href) && (
                      <motion.span
                        layoutId="navbarActiveTab"
                        className="absolute -bottom-2 left-0 w-full h-1 rounded-full bg-emerald-500 transition-all duration-300 ease-out"
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </span>
                </Link>
              ))}
              
              {/* Auth Links - Only show when logged in */}
              {isAuthenticated && authNavLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 whitespace-nowrap flex items-center space-x-2",
                    isActiveLink(link.href)
                      ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 shadow-sm shadow-emerald-500/20"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800/50"
                  )}
                >
                  <link.icon className="w-4 h-4" />
                  <span className="relative inline-flex items-center">
                    <span>{link.name}</span>
                    {isActiveLink(link.href) && (
                      <motion.span
                        layoutId="navbarActiveTab"
                        className="absolute -bottom-2 left-0 w-full h-1 rounded-full bg-emerald-500 transition-all duration-300 ease-out"
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </span>
                </Link>
              ))}
            </div>

            
            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-all duration-300 group"
              >
                {theme === 'light' ? 
                  <Moon className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" /> : 
                  <Sun className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                }
              </button>
              
              {/* Notifications - Only show when logged in */}
              {isAuthenticated && (
                <div className="relative">
                  <button 
                    onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                    className="relative p-2.5 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-all duration-300 group"
                  >
                    <Bell className="w-5 h-5 group-hover:animate-pulse" />
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                      3
                    </span>
                  </button>
                  
                  <AnimatePresence>
                    {isNotificationOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-3 w-80 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 py-2 overflow-hidden"
                      >
                        <div className="px-4 py-3 border-b border-gray-200/50 dark:border-gray-700/50">
                          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Notifications</h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400">You have 3 new notifications</p>
                        </div>
                        <div className="max-h-96 overflow-y-auto">
                          <div className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer">
                            <div className="flex items-start space-x-3">
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900 dark:text-white">New disease scan result</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Your crop analysis is ready</p>
                                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">2 hours ago</p>
                              </div>
                            </div>
                          </div>
                          <div className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer">
                            <div className="flex items-start space-x-3">
                              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900 dark:text-white">Weather alert</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Rain expected tomorrow</p>
                                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">5 hours ago</p>
                              </div>
                            </div>
                          </div>
                          <div className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer">
                            <div className="flex items-start space-x-3">
                              <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900 dark:text-white">Mandi price update</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Wheat prices increased by 5%</p>
                                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">1 day ago</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="border-t border-gray-200/50 dark:border-gray-700/50 mt-2">
                          <Link
                            to="/notifications"
                            onClick={() => setIsNotificationOpen(false)}
                            className="block px-4 py-2 text-center text-sm text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition-colors"
                          >
                            View all notifications
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Profile Section */}
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-3 p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-all duration-300 group"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-lime-500 rounded-full flex items-center justify-center shadow-sm group-hover:shadow-emerald-500/25 transition-all duration-300">
                      <span className="text-white font-semibold text-sm">
                        {user?.fullName?.charAt(0)?.toUpperCase() || 'U'}
                      </span>
                    </div>
                    <div className="hidden xl:block text-left">
                      <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                        {user?.fullName?.split(' ')[0] || 'User'}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{user?.role || 'farmer'}</p>
                    </div>
                    <ChevronDown className={cn(
                      "w-4 h-4 text-gray-400 transition-transform duration-300",
                      isProfileOpen && "rotate-180"
                    )} />
                  </button>

                  <AnimatePresence>
                    {isProfileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-3 w-56 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 py-2 overflow-hidden"
                      >
                        <div className="px-4 py-3 border-b border-gray-200/50 dark:border-gray-700/50">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.fullName}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
                        </div>
                        <Link
                          to="/dashboard"
                          className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors duration-200"
                        >
                          <BarChart3 className="w-4 h-4" />
                          <span>Dashboard</span>
                        </Link>
                        <Link
                          to="/profile"
                          className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors duration-200"
                        >
                          <User className="w-4 h-4" />
                          <span>My Profile</span>
                        </Link>
                        <Link
                          to="/notifications"
                          className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors duration-200"
                        >
                          <Bell className="w-4 h-4" />
                          <span>Notifications</span>
                          <span className="ml-auto w-2 h-2 bg-red-500 rounded-full"></span>
                        </Link>
                        <Link
                          to="/settings"
                          className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors duration-200"
                        >
                          <Settings className="w-4 h-4" />
                          <span>Settings</span>
                        </Link>
                        <Link
                          to="/help"
                          className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors duration-200"
                        >
                          <HelpCircle className="w-4 h-4" />
                          <span>Help Center</span>
                        </Link>
                        <div className="border-t border-gray-200/50 dark:border-gray-700/50 my-1"></div>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
              </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800/50 rounded-lg transition-all duration-300"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-emerald-500 to-lime-500 text-white rounded-lg hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 flex items-center space-x-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Get Started</span>
                  </Link>
                </div>
              )}
          </div>

          </div>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50 shadow-sm">
        <div className="px-4 sm:px-6">
          <div className="flex items-center justify-between h-[64px]">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-lime-500 rounded-xl flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-display font-bold text-gray-900 dark:text-white">
                Agri<span className="text-emerald-500">Smart</span>
              </span>
            </Link>

            {/* Mobile Actions */}
            <div className="flex items-center space-x-2">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-all duration-300"
              >
                {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </button>
              
              {/* Hamburger Menu */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-all duration-300"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

      </nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Menu Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-80 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-lime-500 rounded-xl flex items-center justify-center">
                      <Leaf className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xl font-display font-bold text-gray-900 dark:text-white">
                      Agri<span className="text-emerald-500">Smart</span>
                    </span>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-all duration-300"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                
                {/* Navigation Links */}
                <div className="space-y-2">
                  {/* Public Links */}
                  {publicNavLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-300",
                        isActiveLink(link.href)
                          ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10"
                          : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800/50"
                      )}
                    >
                      {link.icon && <link.icon className="w-5 h-5" />}
                      <span>{link.name}</span>
                    </Link>
                  ))}
                  
                  {/* Auth Links - Only show when logged in */}
                  {isAuthenticated && (
                    <>
                      <div className="border-t border-gray-200 dark:border-gray-700 my-4"></div>
                      {authNavLinks.map((link) => (
                        <Link
                          key={link.name}
                          to={link.href}
                          onClick={() => setIsOpen(false)}
                          className={cn(
                            "flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-300",
                            isActiveLink(link.href)
                              ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10"
                              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800/50"
                          )}
                        >
                          <link.icon className="w-5 h-5" />
                          <span>{link.name}</span>
                        </Link>
                      ))}
                      <Link
                        to="/profile"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center space-x-3 px-4 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800/50 rounded-lg font-medium transition-all duration-300"
                      >
                        <User className="w-5 h-5" />
                        <span>My Profile</span>
                      </Link>
                      <Link
                        to="/settings"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center space-x-3 px-4 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800/50 rounded-lg font-medium transition-all duration-300"
                      >
                        <Settings className="w-5 h-5" />
                        <span>Settings</span>
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsOpen(false);
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg font-medium transition-all duration-300"
                      >
                        <LogOut className="w-5 h-5" />
                        <span>Logout</span>
                      </button>
                    </>
                  )}
                  
                  {/* Login/Register - Only show when not logged in */}
                  {!isAuthenticated && (
                    <>
                      <div className="border-t border-gray-200 dark:border-gray-700 my-4"></div>
                      <div className="space-y-3">
                        <Link
                          to="/login"
                          onClick={() => setIsOpen(false)}
                          className="block w-full py-3 text-center text-gray-700 dark:text-gray-300 font-medium border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-300"
                        >
                          Login
                        </Link>
                        <Link
                          to="/register"
                          onClick={() => setIsOpen(false)}
                          className="block w-full py-3 text-center text-white font-medium bg-gradient-to-r from-emerald-500 to-lime-500 rounded-lg hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300"
                        >
                          Get Started
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
