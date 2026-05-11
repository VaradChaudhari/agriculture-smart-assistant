import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Eye, Ban, CheckCircle, Mail, Phone, MapPin } from 'lucide-react';
import { mockUsers } from '@/data/mockData';
import { cn, formatDate } from '@/utils/helpers';
import { motion as motionDiv, AnimatePresence } from 'framer-motion';

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch = user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === '' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const roles = ['farmer', 'expert', 'admin'];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">User Management</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Manage platform users and their access</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search users by name or email..."
            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
          />
        </div>
        <div className="flex space-x-2">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-colors"
          >
            <option value="">All Roles</option>
            {roles.map((role) => (
              <option key={role} value={role} className="capitalize">{role}</option>
            ))}
          </select>
          <button className="px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Users', value: mockUsers.length, color: 'blue' },
          { label: 'Farmers', value: mockUsers.filter((u) => u.role === 'farmer').length, color: 'emerald' },
          { label: 'Experts', value: mockUsers.filter((u) => u.role === 'expert').length, color: 'amber' },
          { label: 'Active', value: mockUsers.filter((u) => u.status === 'active').length, color: 'purple' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={cn('rounded-xl p-4 border transition-colors duration-300', {
              'bg-blue-100 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/20': stat.color === 'blue',
              'bg-emerald-100 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20': stat.color === 'emerald',
              'bg-amber-100 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20': stat.color === 'amber',
              'bg-purple-100 dark:bg-purple-500/10 border-purple-200 dark:border-purple-500/20': stat.color === 'purple'
            })}
          >
            <p className={cn('text-sm font-medium', {
              'text-blue-700 dark:text-blue-400': stat.color === 'blue',
              'text-emerald-700 dark:text-emerald-400': stat.color === 'emerald',
              'text-amber-700 dark:text-amber-400': stat.color === 'amber',
              'text-purple-700 dark:text-purple-400': stat.color === 'purple'
            })}>{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-lg transition-colors duration-300">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">User</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Contact</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Role</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Location</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">Joined</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 dark:text-gray-300">Status</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 dark:text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredUsers.map((user, index) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-500/20 rounded-full flex items-center justify-center">
                        <span className="text-emerald-600 dark:text-emerald-400 font-medium">{user.fullName.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{user.fullName}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">ID: {user.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300">
                        <Mail className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        <span>{user.email}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300">
                        <Phone className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        <span>{user.mobileNumber}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      'px-3 py-1 rounded-full text-xs font-medium capitalize',
                      user.role === 'admin' && 'bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-400',
                      user.role === 'farmer' && 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400',
                      user.role === 'expert' && 'bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400'
                    )}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                      <MapPin className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                      <span>{user.location}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                    {formatDate(user.createdAt)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={cn(
                      'px-2 py-1 rounded-full text-xs font-medium',
                      'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400'
                    )}>
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="p-2 text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-500/10 rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        className={cn(
                          'p-2 rounded-lg transition-colors',
                          'text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-100 dark:hover:bg-red-500/10'
                        )}
                      >
                        <Ban className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">No users found matching your search.</p>
          </div>
        )}
      </div>

      {/* User Detail Modal */}
      <AnimatePresence>
        {selectedUser && (
          <motionDiv.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start sm:items-center justify-center overflow-y-auto bg-black/50 backdrop-blur-sm p-4"
            onClick={() => setSelectedUser(null)}
          >
            <motionDiv.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md max-h-[92vh] overflow-hidden rounded-3xl bg-white dark:bg-slate-900 shadow-xl flex flex-col border border-gray-200 dark:border-gray-700 transition-colors duration-300"
            >
              <div className="shrink-0 text-center p-6 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-emerald-600 dark:text-emerald-400 text-2xl font-bold">{selectedUser.fullName.charAt(0)}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{selectedUser.fullName}</h3>
                <p className="text-gray-600 dark:text-gray-400">{selectedUser.email}</p>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-6 scrollbar-thin scrollbar-thumb-emerald-500">
                <div className="space-y-4">
                  <div className="flex justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-400">Role</span>
                    <span className="text-gray-900 dark:text-white capitalize">{selectedUser.role}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-400">Phone</span>
                    <span className="text-gray-900 dark:text-white">{selectedUser.mobileNumber}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-400">Location</span>
                    <span className="text-gray-900 dark:text-white">{selectedUser.location}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-400">Status</span>
                    <span className={cn(
                      'px-2 py-1 rounded-full text-xs font-medium',
                      'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400'
                    )}>
                      Active
                    </span>
                  </div>
                  <div className="flex justify-between py-3">
                    <span className="text-gray-600 dark:text-gray-400">Joined</span>
                    <span className="text-gray-900 dark:text-white">{formatDate(selectedUser.createdAt)}</span>
                  </div>
                </div>
              </div>

              <div className="shrink-0 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
                <button
                  onClick={() => setSelectedUser(null)}
                  className="w-full py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-medium rounded-xl transition-colors"
                >
                  Close
                </button>
              </div>
            </motionDiv.div>
          </motionDiv.div>
        )}
      </AnimatePresence>
    </div>
  );
}
