import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  TrendingUp,
  Activity,
  Scan,
  Calendar,
  ArrowUp,
  ArrowDown,
  BarChart3,
  PieChart,
} from 'lucide-react';

export default function AdminAnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');

  const metrics = [
    {
      label: 'Total Users',
      value: '52,847',
      change: '+12.5%',
      trend: 'up',
      icon: Users,
    },
    {
      label: 'Disease Scans',
      value: '1.2M',
      change: '+8.2%',
      trend: 'up',
      icon: Scan,
    },
    {
      label: 'Active Sessions',
      value: '8,432',
      change: '+5.3%',
      trend: 'up',
      icon: Activity,
    },
    {
      label: 'Revenue',
      value: '₹2.4M',
      change: '+18.7%',
      trend: 'up',
      icon: TrendingUp,
    },
  ];

  const topCrops = [
    { name: 'Rice', scans: 320000, percentage: 35 },
    { name: 'Wheat', scans: 245000, percentage: 27 },
    { name: 'Cotton', scans: 180000, percentage: 20 },
    { name: 'Sugarcane', scans: 120000, percentage: 13 },
    { name: 'Others', scans: 54000, percentage: 5 },
  ];

  const regionData = [
    { region: 'Uttar Pradesh', users: 12500, growth: '+15%' },
    { region: 'Punjab', users: 9800, growth: '+12%' },
    { region: 'Maharashtra', users: 8700, growth: '+18%' },
    { region: 'Gujarat', users: 7200, growth: '+10%' },
    { region: 'Karnataka', users: 6500, growth: '+14%' },
  ];

  const recentActivity = [
    { action: 'New user registration', user: 'Rajesh Kumar', time: '2 min ago', type: 'user' },
    { action: 'Disease scan completed', user: 'Priya Singh', time: '5 min ago', type: 'scan' },
    { action: 'Expert consultation booked', user: 'Amit Patel', time: '12 min ago', type: 'booking' },
    { action: 'Premium subscription', user: 'Suresh Reddy', time: '25 min ago', type: 'payment' },
    { action: 'New user registration', user: 'Meena Devi', time: '30 min ago', type: 'user' },
  ];

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Analytics Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Monitor platform performance and user engagement</p>
      </div>

      {/* Period Selector */}
      <div className="mb-6 flex items-center space-x-2">
        {['7d', '30d', '90d', '1y'].map((period) => (
          <button
            key={period}
            onClick={() => setSelectedPeriod(period)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              selectedPeriod === period
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {period}
          </button>
        ))}
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-colors duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-500/20 rounded-xl flex items-center justify-center">
                <metric.icon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className={`flex items-center space-x-1 text-sm font-medium ${
                metric.trend === 'up' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
              }`}>
                {metric.trend === 'up' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                <span>{metric.change}</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{metric.value}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">{metric.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Top Crops */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-colors duration-300">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Disease Scans by Crop</h2>
            <PieChart className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {topCrops.map((crop) => (
              <div key={crop.name}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{crop.name}</span>
                  <span className="text-gray-600 dark:text-gray-400 text-sm">{crop.scans.toLocaleString()} scans</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-emerald-500 to-lime-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${crop.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Regional Data */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-colors duration-300">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Top Regions</h2>
            <BarChart3 className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {regionData.map((region) => (
              <div key={region.region} className="flex items-center justify-between">
                <div>
                  <p className="text-gray-700 dark:text-gray-300 font-medium">{region.region}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{region.users.toLocaleString()} users</p>
                </div>
                <span className="text-emerald-600 dark:text-emerald-400 text-sm font-medium">{region.growth}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Activity</h2>
          <Activity className="w-5 h-5 text-gray-400" />
        </div>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl transition-colors duration-300"
            >
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activity.type === 'user' ? 'bg-blue-100 dark:bg-blue-500/20' :
                  activity.type === 'scan' ? 'bg-emerald-100 dark:bg-emerald-500/20' :
                  activity.type === 'booking' ? 'bg-purple-100 dark:bg-purple-500/20' :
                  'bg-lime-100 dark:bg-lime-500/20'
                }`}>
                  <Users className={`w-5 h-5 ${
                    activity.type === 'user' ? 'text-blue-600 dark:text-blue-400' :
                    activity.type === 'scan' ? 'text-emerald-600 dark:text-emerald-400' :
                    activity.type === 'booking' ? 'text-purple-600 dark:text-purple-400' :
                    'text-lime-600 dark:text-lime-400'
                  }`} />
                </div>
                <div>
                  <p className="text-gray-900 dark:text-white font-medium">{activity.action}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{activity.user}</p>
                </div>
              </div>
              <span className="text-gray-500 dark:text-gray-400 text-sm flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{activity.time}</span>
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
