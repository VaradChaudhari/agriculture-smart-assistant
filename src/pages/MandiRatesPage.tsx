import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, TrendingUp, TrendingDown, Minus, MapPin, ArrowUpRight, ArrowDownRight, ArrowRight, Loader2 } from 'lucide-react';
import { mandiAPI } from '@/services/api';
import { useAuth } from '@/context/AuthContext';
import { cn, formatCurrency } from '@/utils/helpers';
import toast from 'react-hot-toast';
import type { MandiRate } from '@/types';

export default function MandiRatesPage() {
  const { isAuthenticated } = useAuth();
  const [rates, setRates] = useState<MandiRate[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const data = await mandiAPI.getRates();
        setRates(data);
      } catch (error) {
        toast.error('Failed to load mandi rates');
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, []);

  const filteredRates = rates.filter((rate: MandiRate) => {
    const cropName = rate.crop || rate.cropName || '';
    const matchesCrop = cropName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = locationFilter === '' || rate.market.toLowerCase().includes(locationFilter.toLowerCase());
    return matchesCrop && matchesLocation;
  });

  const locations = [...new Set(rates.map((r: MandiRate) => r.market))];

  if (loading) {
    return (
      <div className="px-6 lg:px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 lg:px-8 py-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Mandi Rates</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Real-time market prices for crops across India
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search crop name..."
            className="input pl-10"
          />
        </div>
        <div className="relative md:w-64">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="input pl-10 appearance-none"
          >
            <option value="">All Locations</option>
            {locations.map((loc: string) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Market Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Top Gainer', crop: 'Tomato', change: '+5.2%', up: true },
          { label: 'Top Loser', crop: 'Maize', change: '-1.5%', up: false },
          { label: 'Most Traded', crop: 'Wheat', volume: '45K tons' },
          { label: 'Markets Active', count: '48', trend: '+3 today' },
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card p-4"
          >
            <p className="text-sm text-gray-500">{item.label}</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white mt-1">{item.crop || item.count}</p>
            {'change' in item && (
              <p className={cn('text-sm flex items-center', item.up ? 'text-emerald-600' : 'text-red-600')}>
                {item.up ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                {item.change}
              </p>
            )}
            {'volume' in item && <p className="text-sm text-gray-500">{item.volume}</p>}
            {'trend' in item && <p className="text-sm text-gray-500">{item.trend}</p>}
          </motion.div>
        ))}
      </div>

      {/* Rates Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Crop</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Market Location</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900 dark:text-white">Price</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900 dark:text-white">Change</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900 dark:text-white">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredRates.map((rate: MandiRate, index: number) => {
                const cropName = rate.crop || rate.cropName || '';
                const price = rate.price || rate.avgPrice || 0;
                const unit = rate.unit || 'per quintal';
                const change = rate.change || '0%';
                const trend = rate.trend || 'stable';
                return (
                  <motion.tr
                    key={rate.id || index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg flex items-center justify-center">
                          <span className="text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                            {cropName.charAt(0)}
                          </span>
                        </div>
                        <span className="font-medium text-gray-900 dark:text-white">{cropName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{rate.market}</td>
                    <td className="px-6 py-4 text-right font-medium text-gray-900 dark:text-white">
                      ₹{price} {unit}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={cn('text-sm font-medium', 
                        change.includes('+') ? 'text-emerald-600' : 'text-red-600'
                      )}>
                        {change}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center">
                        {trend === 'up' ? (
                          <TrendingUp className="w-4 h-4 text-emerald-500" />
                        ) : trend === 'down' ? (
                          <TrendingDown className="w-4 h-4 text-red-500" />
                        ) : (
                          <Minus className="w-4 h-4 text-gray-500" />
                        )}
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredRates.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No results found. Try adjusting your search.</p>
          </div>
        )}
      </div>

      <p className="text-sm text-gray-500 mt-4 text-center">
        Last updated: {new Date().toLocaleString('en-IN')} • Data source: Agmarknet
      </p>

      {/* Guest Preview CTA */}
      {!isAuthenticated && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-8 text-white text-center"
        >
          <h3 className="text-2xl font-bold mb-3">Track Live Mandi Rates</h3>
          <p className="text-purple-50 mb-6">Get real-time market prices from 3000+ mandis across India and make informed selling decisions</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!isAuthenticated ? (
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                <span>Create Free Account</span>
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            ) : (
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                <span>Go to Dashboard</span>
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            )}
            <Link
              to="/login"
              className="inline-flex items-center justify-center px-6 py-3 bg-white/20 text-white font-semibold rounded-lg hover:bg-white/30 transition-colors border border-white/30"
            >
              Login
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
}
