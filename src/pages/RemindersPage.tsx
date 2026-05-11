import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Calendar, Clock, Bell, CheckCircle, X, Droplets, Leaf, Bug, Wheat, Waves, Trash2, Edit2 } from 'lucide-react';
import { mockReminders } from '@/data/mockData';
import { cn, getReminderTypeColor, formatDate } from '@/utils/helpers';
import { REMINDER_TYPES } from '@/utils/constants';
import toast from 'react-hot-toast';
import type { Reminder } from '@/types';

const typeIcons: Record<string, any> = {
  watering: Droplets,
  fertilizer: Leaf,
  pesticide: Bug,
  harvesting: Wheat,
  irrigation: Waves,
};

export default function RemindersPage() {
  const [reminders, setReminders] = useState(mockReminders);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReminder, setEditingReminder] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    type: 'watering',
    description: '',
    scheduledDate: '',
    scheduledTime: '',
    priority: 'medium',
  });

  const handleAddReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingReminder) {
      setReminders(reminders.map((r) => (r.id === editingReminder.id ? { ...r, ...formData } : r)));
      toast.success('Reminder updated successfully');
    } else {
      const newReminder: Reminder = {
        id: Date.now().toString(),
        title: formData.title,
        type: formData.type,
        description: formData.description,
        scheduledDate: formData.scheduledDate,
        scheduledTime: formData.scheduledTime,
        priority: formData.priority,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };
      setReminders([...reminders, newReminder]);
      toast.success('Reminder added successfully');
    }
    closeModal();
  };

  const handleDelete = (id: string) => {
    setReminders(reminders.filter((r) => r.id !== id));
    toast.success('Reminder deleted');
  };

  const handleToggleStatus = (id: string) => {
    setReminders(reminders.map((r) =>
      r.id === id ? { ...r, status: r.status === 'completed' ? 'pending' : 'completed' } : r
    ));
  };

  const openEditModal = (reminder: any) => {
    setEditingReminder(reminder);
    setFormData({
      title: reminder.title,
      type: reminder.type,
      description: reminder.description,
      scheduledDate: reminder.scheduledDate,
      scheduledTime: reminder.scheduledTime,
      priority: reminder.priority,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingReminder(null);
    setFormData({ title: '', type: 'watering', description: '', scheduledDate: '', scheduledTime: '', priority: 'medium' });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-amber-600 bg-amber-100';
      case 'low': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Farming Reminders</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Stay on track with your farming activities</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-4 md:mt-0 btn-primary flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Reminder</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Total', count: reminders.length, color: 'blue' },
          { label: 'Pending', count: reminders.filter((r) => r.status === 'pending').length, color: 'amber' },
          { label: 'Completed', count: reminders.filter((r) => r.status === 'completed').length, color: 'emerald' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={cn('card p-4', `bg-${stat.color}-50 dark:bg-${stat.color}-900/10`)}
          >
            <p className={cn('text-sm', `text-${stat.color}-600 dark:text-${stat.color}-400`)}>{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.count}</p>
          </motion.div>
        ))}
      </div>

      {/* Reminders List */}
      <div className="space-y-4">
        {reminders.map((reminder, index) => {
          const TypeIcon = typeIcons[reminder.type] || Bell;
          return (
            <motion.div
              key={reminder.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={cn(
                'card p-4 flex items-center space-x-4 transition-all',
                reminder.status === 'completed' && 'opacity-60'
              )}
            >
              <button
                onClick={() => handleToggleStatus(reminder.id)}
                className={cn(
                  'w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors',
                  reminder.status === 'completed'
                    ? 'bg-emerald-500 border-emerald-500'
                    : 'border-gray-300 hover:border-emerald-500'
                )}
              >
                {reminder.status === 'completed' && <CheckCircle className="w-4 h-4 text-white" />}
              </button>

              <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center', getReminderTypeColor(reminder.type))}>
                <TypeIcon className="w-6 h-6" />
              </div>

              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className={cn('font-semibold', reminder.status === 'completed' && 'line-through text-gray-500')}>
                    {reminder.title}
                  </h3>
                  <span className={cn('px-2 py-0.5 rounded-full text-xs font-medium', getPriorityColor(reminder.priority))}>
                    {reminder.priority}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-0.5">{reminder.description}</p>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(reminder.scheduledDate)}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{reminder.scheduledTime}</span>
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => openEditModal(reminder)}
                  className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(reminder.id)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {reminders.length === 0 && (
        <div className="text-center py-12">
          <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No reminders yet. Add your first reminder!</p>
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start sm:items-center justify-center overflow-y-auto bg-black/50 backdrop-blur-sm p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md max-h-[92vh] overflow-hidden rounded-3xl bg-white dark:bg-slate-900 shadow-2xl flex flex-col"
            >
              <div className="shrink-0 flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {editingReminder ? 'Edit Reminder' : 'Add Reminder'}
                </h3>
                <button onClick={closeModal} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-6 scrollbar-thin scrollbar-thumb-emerald-500">
                <form id="reminder-form" onSubmit={handleAddReminder} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title</label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="input"
                      placeholder="e.g., Water wheat field"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Type</label>
                    <div className="grid grid-cols-3 gap-2">
                      {REMINDER_TYPES.map((type) => (
                        <button
                          key={type.value}
                          type="button"
                          onClick={() => setFormData({ ...formData, type: type.value })}
                          className={cn(
                            'py-2 px-3 rounded-lg text-sm font-medium transition-colors border-2',
                            formData.type === type.value
                              ? `border-${type.color}-500 bg-${type.color}-50 dark:bg-${type.color}-900/20 text-${type.color}-600`
                              : 'border-gray-200 dark:border-gray-700 text-gray-600 hover:border-emerald-300'
                          )}
                        >
                          {type.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="input resize-none"
                      rows={2}
                      placeholder="Add details..."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date</label>
                      <input
                        type="date"
                        required
                        value={formData.scheduledDate}
                        onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
                        className="input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Time</label>
                      <input
                        type="time"
                        required
                        value={formData.scheduledTime}
                        onChange={(e) => setFormData({ ...formData, scheduledTime: e.target.value })}
                        className="input"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Priority</label>
                    <div className="flex space-x-2">
                      {['low', 'medium', 'high'].map((priority) => (
                        <button
                          key={priority}
                          type="button"
                          onClick={() => setFormData({ ...formData, priority })}
                          className={cn(
                            'flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors capitalize',
                            formData.priority === priority
                              ? priority === 'high' ? 'bg-red-100 text-red-600' : priority === 'medium' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          )}
                        >
                          {priority}
                        </button>
                      ))}
                    </div>
                  </div>
                </form>
              </div>

              <div className="shrink-0 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
                <button type="submit" form="reminder-form" className="w-full btn-primary">
                  {editingReminder ? 'Update Reminder' : 'Add Reminder'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
