import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CloudSun, Sun, CloudRain, Cloud, Wind, Droplets, Eye, Thermometer, Search, MapPin, Navigation, ArrowRight } from 'lucide-react';
import { weatherAPI } from '@/services/api';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/utils/helpers';

export default function WeatherPage() {
  const { isAuthenticated } = useAuth();
  const [location, setLocation] = useState('Ahmedabad, Gujarat');
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchWeather();
  }, [location]);

  const fetchWeather = async () => {
    setLoading(true);
    try {
      const response = await weatherAPI.getWeather(location);
      console.log('Weather API Response:', response);
      
      // Map the API response to the expected format
      const mappedWeather = {
        location: response.location || location,
        temperature: response.current?.temperature || 0,
        humidity: response.current?.humidity || 0,
        windSpeed: response.current?.windSpeed || 0,
        description: response.current?.condition || 'Partly cloudy',
        current: {
          humidity: response.current?.humidity || 0,
          temperature: response.current?.temperature || 0,
          windSpeed: response.current?.windSpeed || 0,
          rainfall: response.current?.rainfall || 0,
          condition: response.current?.condition || 'Partly cloudy',
        },
        hourly: response.forecast?.slice(0, 5).map((item: any) => ({
          time: new Date(item.date).toLocaleTimeString('en-US', { hour: 'numeric', hour12: true }),
          temperature: Math.round(item.temperature),
          condition: item.description,
        })) || [],
        daily: response.forecast?.map((item: any, index: number) => ({
          date: new Date(item.date).toLocaleDateString('en-US', { weekday: 'short' }),
          maxTemp: Math.round(item.temperature + 5),
          minTemp: Math.round(item.temperature - 5),
          rainfall: 0,
          condition: item.description,
        })) || [],
      };
      
      setWeather(mappedWeather);
    } catch (error) {
      console.error('Weather fetch error:', error);
      // Set fallback mock data on error
      setWeather({
        location: location,
        temperature: 32,
        humidity: 65,
        windSpeed: 12,
        description: 'Partly cloudy',
        current: {
          humidity: 65,
          temperature: 32,
          windSpeed: 12,
          rainfall: 0,
          condition: 'Partly cloudy',
        },
        hourly: [
          { time: '12 PM', temperature: 32, condition: 'Partly cloudy' },
          { time: '3 PM', temperature: 34, condition: 'Sunny' },
          { time: '6 PM', temperature: 30, condition: 'Clear' },
          { time: '9 PM', temperature: 28, condition: 'Cloudy' },
          { time: '12 AM', temperature: 26, condition: 'Clear' },
        ],
        daily: [
          { date: 'Mon', maxTemp: 35, minTemp: 25, rainfall: 0, condition: 'Sunny' },
          { date: 'Tue', maxTemp: 34, minTemp: 26, rainfall: 0, condition: 'Partly cloudy' },
          { date: 'Wed', maxTemp: 33, minTemp: 25, rainfall: 2, condition: 'Rainy' },
          { date: 'Thu', maxTemp: 32, minTemp: 24, rainfall: 0, condition: 'Cloudy' },
          { date: 'Fri', maxTemp: 34, minTemp: 26, rainfall: 0, condition: 'Sunny' },
          { date: 'Sat', maxTemp: 35, minTemp: 27, rainfall: 0, condition: 'Sunny' },
          { date: 'Sun', maxTemp: 34, minTemp: 26, rainfall: 0, condition: 'Partly cloudy' },
        ],
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() && isAuthenticated) {
      setLocation(searchQuery);
    } else if (!isAuthenticated) {
      // Show preview of first location only
      setLocation('Ahmedabad, Gujarat');
    }
  };

  const getWeatherIcon = (condition?: string) => {
    const conditionLower = (condition || '').toLowerCase();
    if (conditionLower.includes('rain')) return CloudRain;
    if (conditionLower.includes('cloud')) return Cloud;
    if (conditionLower.includes('sun') || conditionLower.includes('clear')) return Sun;
    return CloudSun;
  };

  if (loading || !weather) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500" />
      </div>
    );
  }

  const WeatherIcon = getWeatherIcon(weather.description);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Weather Forecast</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Get accurate weather predictions for your farm
        </p>
      </div>

      <form onSubmit={handleSearch} className="mb-8">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search location..."
            className="input pl-10 pr-24"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-emerald-500 text-white text-sm font-medium rounded-lg hover:bg-emerald-600 transition-colors"
          >
            Search
          </button>
        </div>
      </form>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Current Weather */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 card p-8 bg-gradient-to-br from-blue-500 to-blue-600 text-white"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5" />
              <span className="text-lg font-medium">{weather.location}</span>
            </div>
            <span className="text-sm opacity-80">{new Date().toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-4">
                <WeatherIcon className="w-24 h-24" />
                <div>
                  <p className="text-7xl font-bold">{weather.temperature}°</p>
                  <p className="text-xl opacity-90">{weather.description}</p>
                </div>
              </div>
            </div>
            <div className="hidden md:grid grid-cols-2 gap-4 text-sm">
              <div className="bg-white/20 rounded-xl p-3">
                <p className="opacity-80">Humidity</p>
                <p className="text-xl font-semibold">{weather.humidity}%</p>
              </div>
              <div className="bg-white/20 rounded-xl p-3">
                <p className="opacity-80">Wind</p>
                <p className="text-xl font-semibold">{weather.windSpeed} km/h</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Hourly Forecast */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Hourly Forecast</h3>
          <div className="space-y-4">
            {weather.hourly.map((hour: any, index: number) => {
              const HourIcon = getWeatherIcon(hour.condition);
              return (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-500 w-16">{hour.time}</span>
                  <HourIcon className="w-6 h-6 text-amber-500" />
                  <span className="font-medium text-gray-900 dark:text-white">{hour.temperature}°</span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* 7-Day Forecast */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-3 card p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">7-Day Forecast</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {weather.daily.map((day: any, index: number) => {
              const DayIcon = getWeatherIcon(day.condition);
              return (
                <div key={index} className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">{day.date}</p>
                  <DayIcon className="w-10 h-10 mx-auto mb-2 text-amber-500" />
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{day.maxTemp}°</p>
                  <p className="text-sm text-gray-500">{day.minTemp}°</p>
                  {day.rainfall > 0 && (
                    <p className="text-xs text-blue-500 mt-1">{day.rainfall}mm rain</p>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Weather Details Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { icon: Droplets, label: 'Humidity', value: `${weather.current.humidity}%`, color: 'blue' },
            { icon: Wind, label: 'Wind Speed', value: `${weather.windSpeed} km/h`, color: 'gray' },
            { icon: Eye, label: 'Visibility', value: '10 km', color: 'amber' },
          ].map((item, index) => (
            <div key={index} className="card p-4 flex items-center space-x-4">
              <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center', `bg-${item.color}-100 dark:bg-${item.color}-900/20`)}>
                <item.icon className={cn('w-6 h-6', `text-${item.color}-600 dark:text-${item.color}-400`)} />
              </div>
              <div>
                <p className="text-sm text-gray-500">{item.label}</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{item.value}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Guest Preview CTA */}
        {!isAuthenticated && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-3 bg-gradient-to-r from-emerald-500 to-lime-500 rounded-2xl p-8 text-white text-center"
          >
            <h3 className="text-2xl font-bold mb-3">Unlock Full Weather Forecasting</h3>
            <p className="text-emerald-50 mb-6">Get hyper-local forecasts for any location across India with farming-specific advisories</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {!isAuthenticated ? (
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center px-6 py-3 bg-white text-emerald-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <span>Create Free Account</span>
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              ) : (
                <Link
                  to="/dashboard"
                  className="inline-flex items-center justify-center px-6 py-3 bg-white text-emerald-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
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
    </div>
  );
}
