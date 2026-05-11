import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  ScanLine,
  TrendingUp,
  Clock,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  MapPin,
} from 'lucide-react';
import { dashboardAPI } from '@/services/api';
import { mockUsers } from '@/data/mockData';
import { cn, formatNumber, formatCurrency } from '@/utils/helpers';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const userGrowthData = [
  { month: 'Jan', users: 1200 },
  { month: 'Feb', users: 1800 },
  { month: 'Mar', users: 2400 },
  { month: 'Apr', users: 3200 },
  { month: 'May', users: 4100 },
  { month: 'Jun', users: 5000 },
];

const activityData = [
  { day: 'Mon', scans: 145, consultations: 28 },
  { day: 'Tue', scans: 189, consultations: 35 },
  { day: 'Wed', scans: 167, consultations: 31 },
  { day: 'Thu', scans: 234, consultations: 42 },
  { day: 'Fri', scans: 198, consultations: 38 },
  { day: 'Sat', scans: 156, consultations: 25 },
  { day: 'Sun', scans: 134, consultations: 22 },
];

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await dashboardAPI.getStats();
        setStats(data);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500" />
      </div>
    );
  }

  const adminStats = [
    { label: 'Total Users', value: stats?.totalUsers || '50,000+', change: '+12%', up: true, icon: Users, color: 'blue' },
    { label: 'Active Farmers', value: stats?.activeFarmers || '42,500', change: '+8%', up: true, icon: MapPin, color: 'emerald' },
    { label: 'Disease Scans', value: stats?.diseaseReports || '1,20,000+', change: '+25%', up: true, icon: ScanLine, color: 'purple' },
    { label: 'Consultations', value: stats?.consultations || '25,000+', change: '+15%', up: true, icon: Activity, color: 'amber' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Overview of platform performance and user activity
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {adminStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg transition-colors duration-300"
          >
            <div className="flex items-center justify-between">
              <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center', {
                'bg-blue-100 dark:bg-blue-500/20': stat.color === 'blue',
                'bg-emerald-100 dark:bg-emerald-500/20': stat.color === 'emerald',
                'bg-purple-100 dark:bg-purple-500/20': stat.color === 'purple',
                'bg-amber-100 dark:bg-amber-500/20': stat.color === 'amber'
              })}>
                <stat.icon className={cn('w-6 h-6', {
                  'text-blue-600 dark:text-blue-400': stat.color === 'blue',
                  'text-emerald-600 dark:text-emerald-400': stat.color === 'emerald',
                  'text-purple-600 dark:text-purple-400': stat.color === 'purple',
                  'text-amber-600 dark:text-amber-400': stat.color === 'amber'
                })} />
              </div>
              <div className={cn('flex items-center space-x-1 text-sm font-medium', stat.up ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400')}>
                {stat.up ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                <span>{stat.change}</span>
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-4">{stat.value}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg transition-colors duration-300"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">User Growth</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                <XAxis dataKey="month" className="text-gray-600 dark:text-gray-400" />
                <YAxis className="text-gray-600 dark:text-gray-400" />
                <Tooltip contentStyle={{ backgroundColor: 'var(--tooltip-bg)', border: '1px solid var(--tooltip-border)' }} wrapperClassName="dark:!bg-gray-800 dark:!border-gray-700" />
                <Line type="monotone" dataKey="users" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg transition-colors duration-300"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Weekly Activity</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                <XAxis dataKey="day" className="text-gray-600 dark:text-gray-400" />
                <YAxis className="text-gray-600 dark:text-gray-400" />
                <Tooltip contentStyle={{ backgroundColor: 'var(--tooltip-bg)', border: '1px solid var(--tooltip-border)' }} wrapperClassName="dark:!bg-gray-800 dark:!border-gray-700" />
                <Bar dataKey="scans" fill="#10b981" />
                <Bar dataKey="consultations" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Recent Users Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-lg transition-colors duration-300"
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Users</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">User</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Role</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Location</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Joined</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 dark:text-gray-300">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {mockUsers.slice(0, 5).map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-500/20 rounded-full flex items-center justify-center">
                        <span className="text-emerald-600 dark:text-emerald-400 font-medium">{user.fullName.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{user.fullName}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-700 dark:text-gray-300 capitalize">{user.role}</td>
                  <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{user.location}</td>
                  <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                    {new Date(user.createdAt).toLocaleDateString('en-IN')}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={cn(
                      'px-2 py-1 rounded-full text-xs font-medium',
                      'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400'
                    )}>
                      Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
