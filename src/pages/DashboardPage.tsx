import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  ScanLine,
  CloudSun,
  TrendingUp,
  Bell,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Droplets,
  Wind,
  Eye,
  Thermometer,
} from 'lucide-react';
import { dashboardAPI, weatherAPI } from '@/services/api';
import { mockDiseaseResults, mockMandiRates, mockActivities, mockConsultations } from '@/data/mockData';
import { cn, formatNumber, formatCurrency, getRelativeTime, getSeverityColor } from '@/utils/helpers';
import type { DashboardStats, WeatherData, Activity } from '@/types';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

const chartData = [
  { name: 'Mon', scans: 12, consultations: 5 },
  { name: 'Tue', scans: 18, consultations: 8 },
  { name: 'Wed', scans: 15, consultations: 6 },
  { name: 'Thu', scans: 25, consultations: 12 },
  { name: 'Fri', scans: 20, consultations: 9 },
  { name: 'Sat', scans: 30, consultations: 15 },
  { name: 'Sun', scans: 22, consultations: 10 },
];

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [activities] = useState<Activity[]>(mockActivities);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, weatherData] = await Promise.all([
          dashboardAPI.getStats(),
          weatherAPI.getWeather('Ahmedabad, Gujarat'),
        ]);
        setStats(statsData);
        setWeather(weatherData);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Here's what's happening on your farm today
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center space-x-2 text-sm text-gray-500">
          <Calendar className="w-4 h-4" />
          <span>{new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Disease Scans', value: stats?.diseaseReports || 145, change: '+12%', up: true, icon: ScanLine, color: 'blue' },
          { label: 'Consultations', value: stats?.consultations || 32, change: '+8%', up: true, icon: Users, color: 'emerald' },
          { label: 'Active Reminders', value: stats?.totalReminders || 18, change: '-3%', up: false, icon: Bell, color: 'amber' },
          { label: 'Market Updates', value: stats?.marketUpdates || 24, change: '+15%', up: true, icon: TrendingUp, color: 'purple' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card p-6"
          >
            <div className="flex items-center justify-between">
              <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center', `bg-${stat.color}-100 dark:bg-${stat.color}-900/20`)}>
                <stat.icon className={cn('w-6 h-6', `text-${stat.color}-600 dark:text-${stat.color}-400`)} />
              </div>
              <div className={cn('flex items-center space-x-1 text-sm', stat.up ? 'text-emerald-600' : 'text-red-600')}>
                {stat.up ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                <span>{stat.change}</span>
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-4">{formatNumber(stat.value)}</p>
            <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Chart Section */}
        <div className="lg:col-span-2 space-y-8">
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Weekly Activity</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorScans" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorConsultations" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip />
                  <Area type="monotone" dataKey="scans" stroke="#10b981" fillOpacity={1} fill="url(#colorScans)" />
                  <Area type="monotone" dataKey="consultations" stroke="#3b82f6" fillOpacity={1} fill="url(#colorConsultations)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Disease Scans */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Recent Disease Scans</h3>
            <div className="space-y-4">
              {mockDiseaseResults.slice(0, 3).map((result) => (
                <div key={result.id} className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <img src={result.imageUrl} alt={result.diseaseName} className="w-20 h-20 rounded-lg object-cover" />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-white">{result.diseaseName}</h4>
                    <p className="text-sm text-gray-500">Detected {getRelativeTime(result.detectedAt)}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className={cn('px-2 py-1 rounded-full text-xs font-medium', getSeverityColor(result.severity))}>
                        {result.severity.charAt(0).toUpperCase() + result.severity.slice(1)}
                      </span>
                      <span className="text-sm text-emerald-600 font-medium">{result.confidence}% confidence</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Content */}
        <div className="space-y-8">
          {/* Weather Card */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Weather</h3>
              <CloudSun className="w-5 h-5 text-amber-500" />
            </div>
            {weather && (
              <div>
                <div className="flex items-center space-x-4">
                  <div className="text-5xl font-bold text-gray-900 dark:text-white">
                    {weather.current.temperature}°C
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">{weather.current.condition}</p>
                    <p className="text-sm text-gray-500">{weather.location}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="flex items-center space-x-2">
                    <Droplets className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{weather.current.humidity}% Humidity</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Wind className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{weather.current.windSpeed} km/h</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Market Prices */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Market Prices</h3>
              <TrendingUp className="w-5 h-5 text-emerald-500" />
            </div>
            <div className="space-y-3">
              {mockMandiRates.slice(0, 4).map((rate) => (
                <div key={rate.id} className="flex items-center justify-between">
                  <span className="text-gray-700 dark:text-gray-300">{rate.cropName}</span>
                  <div className="text-right">
                    <p className="font-medium text-gray-900 dark:text-white">{formatCurrency(rate.avgPrice)}</p>
                    <p className={cn('text-xs', rate.trend === 'up' ? 'text-emerald-600' : rate.trend === 'down' ? 'text-red-600' : 'text-gray-500')}>
                      {rate.trend === 'up' ? '+' : ''}{rate.changePercentage}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Consultations */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Upcoming Consultations</h3>
              <Users className="w-5 h-5 text-blue-500" />
            </div>
            <div className="space-y-4">
              {mockConsultations.filter(c => c.status === 'confirmed').map((consultation) => (
                <div key={consultation.id} className="flex items-center space-x-3">
                  <img src={consultation.expertAvatar} alt={consultation.expertName} className="w-10 h-10 rounded-full object-cover" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white text-sm">{consultation.expertName}</p>
                    <p className="text-xs text-gray-500">{consultation.scheduledDate} at {consultation.scheduledTime}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
              <Eye className="w-5 h-5 text-gray-500" />
            </div>
            <div className="space-y-4">
              {activities.slice(0, 4).map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.title}</p>
                    <p className="text-xs text-gray-500">{getRelativeTime(activity.timestamp)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
