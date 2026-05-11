import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import {
  Settings,
  Bell,
  Shield,
  Palette,
  Database,
  Globe,
  Mail,
  Lock,
  Check,
  Save,
  Smartphone,
  Wifi,
  Volume2,
  Eye,
  EyeOff,
  Sun,
  Moon,
} from 'lucide-react';

export default function SettingsPage() {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('general');
  const [saving, setSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
  ];

  const generalSettings = [
    { id: 'language', label: 'Language', value: 'English', type: 'select', options: ['English', 'Hindi', 'Tamil', 'Telugu'] },
    { id: 'timezone', label: 'Timezone', value: 'IST (UTC+5:30)', type: 'select', options: ['IST (UTC+5:30)', 'EST (UTC-5)', 'PST (UTC-8)'] },
    { id: 'currency', label: 'Currency', value: 'INR', type: 'select', options: ['INR', 'USD', 'EUR'] },
    { id: 'units', label: 'Measurement Units', value: 'Metric', type: 'select', options: ['Metric', 'Imperial'] },
  ];

  const notificationSettings = [
    { id: 'disease_alerts', label: 'Disease Detection Alerts', enabled: true },
    { id: 'weather_updates', label: 'Daily Weather Updates', enabled: true },
    { id: 'market_prices', label: 'Mandi Price Changes', enabled: true },
    { id: 'consultation_reminders', label: 'Consultation Reminders', enabled: true },
    { id: 'farming_tips', label: 'Farming Tips & News', enabled: false },
    { id: 'community_updates', label: 'Community Updates', enabled: true },
  ];

  const securitySettings = [
    { id: 'two_factor', label: 'Two-Factor Authentication', enabled: false },
    { id: 'email_notifications', label: 'Email Notifications for Login', enabled: true },
    { id: 'session_timeout', label: 'Auto-logout (minutes)', value: '60', type: 'number' },
    { id: 'login_alerts', label: 'Login from New Device Alert', enabled: true },
  ];

  const handleSave = async () => {
    setSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSaving(false);
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Settings</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your account settings and preferences</p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar Tabs */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all ${
                      activeTab === tab.id
                        ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </motion.div>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
            >
              {activeTab === 'general' && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
                    <Globe className="w-6 h-6 text-emerald-500" />
                    <span>General Settings</span>
                  </h2>
                  <div className="space-y-6">
                    {generalSettings.map((setting) => (
                      <div key={setting.id}>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          {setting.label}
                        </label>
                        {setting.type === 'select' ? (
                          <select
                            defaultValue={setting.value}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                          >
                            {setting.options.map((option) => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type={setting.type}
                            defaultValue={setting.value}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                          />
                        )}
                      </div>
                    ))}
                    <div className="pt-4">
                      <button
                        onClick={handleSave}
                        disabled={saving}
                        className="inline-flex items-center space-x-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/25 transition-all disabled:opacity-70"
                      >
                        {saving ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Saving...</span>
                          </>
                        ) : (
                          <>
                            <Save className="w-5 h-5" />
                            <span>Save Changes</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
                    <Bell className="w-6 h-6 text-emerald-500" />
                    <span>Notification Settings</span>
                  </h2>
                  <div className="space-y-4">
                    {notificationSettings.map((setting) => (
                      <div key={setting.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                        <div>
                          <p className="text-gray-900 dark:text-white font-medium">{setting.label}</p>
                          <p className="text-gray-500 dark:text-gray-400 text-sm">
                            {setting.enabled ? 'Currently enabled' : 'Currently disabled'}
                          </p>
                        </div>
                        <button
                          className={`w-12 h-7 rounded-full transition-colors ${
                            setting.enabled ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-600'
                          }`}
                        >
                          <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                            setting.enabled ? 'translate-x-6' : 'translate-x-1'
                          }`} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
                    <Shield className="w-6 h-6 text-emerald-500" />
                    <span>Security Settings</span>
                  </h2>
                  <div className="space-y-6">
                    {/* Password Change */}
                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                      <h3 className="font-medium text-gray-900 dark:text-white mb-4">Change Password</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Current Password
                          </label>
                          <div className="relative">
                            <input
                              type={showPassword ? 'text' : 'password'}
                              className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                            >
                              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            New Password
                          </label>
                          <input
                            type="password"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Confirm New Password
                          </label>
                          <input
                            type="password"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Security Options */}
                    <div className="space-y-4">
                      {securitySettings.map((setting) => (
                        <div key={setting.id}>
                          {setting.type ? (
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                {setting.label}
                              </label>
                              <input
                                type={setting.type}
                                defaultValue={setting.value}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                              />
                            </div>
                          ) : (
                            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                              <div>
                                <p className="text-gray-900 dark:text-white font-medium">{setting.label}</p>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">
                                  {setting.enabled ? 'Currently enabled' : 'Currently disabled'}
                                </p>
                              </div>
                              <button
                                className={`w-12 h-7 rounded-full transition-colors ${
                                  setting.enabled ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-600'
                                }`}
                              >
                                <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                                  setting.enabled ? 'translate-x-6' : 'translate-x-1'
                                }`} />
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'appearance' && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
                    <Palette className="w-6 h-6 text-emerald-500" />
                    <span>Appearance Settings</span>
                  </h2>
                  <div className="space-y-6">
                    {/* Theme Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                        Theme
                      </label>
                      <div className="grid grid-cols-3 gap-4">
                        <button
                          onClick={() => theme !== 'light' && toggleTheme()}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            theme === 'light'
                              ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-500/20'
                              : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                          }`}
                        >
                          <Sun className="w-6 h-6 mx-auto mb-2 text-yellow-500" />
                          <span className="text-sm font-medium text-gray-900 dark:text-white">Light</span>
                        </button>
                        <button
                          onClick={() => theme !== 'dark' && toggleTheme()}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            theme === 'dark'
                              ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-500/20'
                              : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                          }`}
                        >
                          <Moon className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                          <span className="text-sm font-medium text-gray-900 dark:text-white">Dark</span>
                        </button>
                        <button
                          className="p-4 rounded-xl border-2 border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 transition-all"
                        >
                          <Smartphone className="w-6 h-6 mx-auto mb-2 text-gray-500" />
                          <span className="text-sm font-medium text-gray-900 dark:text-white">System</span>
                        </button>
                      </div>
                    </div>

                    {/* Color Scheme */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                        Accent Color
                      </label>
                      <div className="flex space-x-4">
                        {['emerald', 'blue', 'purple', 'rose'].map((color) => (
                          <button
                            key={color}
                            className={`w-12 h-12 rounded-xl transition-all ${
                              color === 'emerald' ? 'ring-4 ring-offset-2 ring-emerald-500' : ''
                            } bg-${color}-500`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Font Size */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Font Size
                      </label>
                      <select className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500">
                        <option value="small">Small</option>
                        <option value="medium" selected>Medium</option>
                        <option value="large">Large</option>
                      </select>
                    </div>

                    {/* Other Options */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                        <div>
                          <p className="text-gray-900 dark:text-white font-medium">Animations</p>
                          <p className="text-gray-500 dark:text-gray-400 text-sm">Enable smooth transitions and animations</p>
                        </div>
                        <button className="w-12 h-7 rounded-full bg-emerald-500 transition-colors">
                          <div className="w-5 h-5 bg-white rounded-full shadow-md transform transition-transform translate-x-6" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                        <div>
                          <p className="text-gray-900 dark:text-white font-medium">Sound Effects</p>
                          <p className="text-gray-500 dark:text-gray-400 text-sm">Play sounds for notifications and actions</p>
                        </div>
                        <button className="w-12 h-7 rounded-full bg-gray-300 dark:bg-gray-600 transition-colors">
                          <div className="w-5 h-5 bg-white rounded-full shadow-md transform transition-transform translate-x-1" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
