import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Settings,
  Bell,
  Shield,
  Palette,
  Database,
  Users,
  Globe,
  Mail,
  Lock,
  Check,
  X,
  Save,
} from 'lucide-react';

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [saving, setSaving] = useState(false);

  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
  ];

  const generalSettings = [
    { id: 'site_name', label: 'Site Name', value: 'Agriculture Smart Assistant', type: 'text' },
    { id: 'site_url', label: 'Site URL', value: 'https://agriculture-smart.in', type: 'url' },
    { id: 'support_email', label: 'Support Email', value: 'support@agriculture-smart.in', type: 'email' },
    { id: 'support_phone', label: 'Support Phone', value: '+91 1800-123-4567', type: 'tel' },
  ];

  const notificationSettings = [
    { id: 'new_user', label: 'New User Registration', enabled: true },
    { id: 'premium_sub', label: 'Premium Subscription', enabled: true },
    { id: 'consultation', label: 'Expert Consultation Booked', enabled: true },
    { id: 'system_alert', label: 'System Alerts', enabled: true },
    { id: 'daily_report', label: 'Daily Reports', enabled: false },
    { id: 'weekly_report', label: 'Weekly Reports', enabled: true },
  ];

  const securitySettings = [
    { id: '2fa', label: 'Two-Factor Authentication', enabled: true },
    { id: 'ip_whitelist', label: 'IP Whitelist', enabled: false },
    { id: 'session_timeout', label: 'Session Timeout (min)', value: '30', type: 'number' },
    { id: 'max_attempts', label: 'Max Login Attempts', value: '5', type: 'number' },
  ];

  const handleSave = async () => {
    setSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSaving(false);
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage your admin panel settings</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar Tabs */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg border border-gray-100 dark:border-gray-700">
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
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            {activeTab === 'general' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
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
                      <input
                        type={setting.type}
                        defaultValue={setting.value}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                      />
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
              </motion.div>
            )}

            {activeTab === 'notifications' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
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
              </motion.div>
            )}

            {activeTab === 'security' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
                  <Shield className="w-6 h-6 text-emerald-500" />
                  <span>Security Settings</span>
                </h2>
                <div className="space-y-6">
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
              </motion.div>
            )}

            {activeTab === 'appearance' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
                  <Palette className="w-6 h-6 text-emerald-500" />
                  <span>Appearance Settings</span>
                </h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Theme Color
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
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Default Theme
                    </label>
                    <select className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500">
                      <option value="light">Light Mode</option>
                      <option value="dark">Dark Mode</option>
                      <option value="system">System Default</option>
                    </select>
                  </div>
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
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
