import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  CloudSun, 
  Sun, 
  CloudRain, 
  Cloud, 
  Wind, 
  Droplets, 
  Eye, 
  Thermometer, 
  Search, 
  MapPin, 
  ArrowRight 
} from 'lucide-react';
import { weatherAPI } from '@/services/api';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/utils/helpers';
import toast from 'react-hot-toast';

export default function WeatherPage() {
  const { isAuthenticated } = useAuth();
  const [location, setLocation] = useState('Ahmedabad, Gujarat');
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchWeather();
  }, [location]);

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await weatherAPI.getWeather(location);
      console.log('Weather API Response:', response);
      
      // Safe data extraction with fallbacks
      const safeData = {
        location: response?.location || location,
        temperature: response?.current?.temperature ?? 32,
        humidity: response?.current?.humidity ?? 65,
        windSpeed: response?.current?.windSpeed ?? 12,
        rainfall: response?.current?.rainfall ?? 0,
        description: response?.current?.condition ?? 'Partly cloudy',
        icon: response?.current?.icon ?? '02d',
        current: {
          temperature: response?.current?.temperature ?? 32,
          humidity: response?.current?.humidity ?? 65,
          windSpeed: response?.current?.windSpeed ?? 12,
          rainfall: response?.current?.rainfall ?? 0,
          condition: response?.current?.condition ?? 'Partly cloudy',
          icon: response?.current?.icon ?? '02d',
        },
        hourly: Array.isArray(response?.forecast) 
          ? response.forecast.slice(0, 5).map((item: any, i: number) => ({
              time: item?.day
                ? new Date(item.day).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
                : `${(i + 1) * 3}:00`,
              temperature: item?.temperature ?? 30,
              condition: item?.condition ?? 'Clear',
            }))
          : [
              { time: '12:00', temperature: 32, condition: 'Partly cloudy' },
              { time: '15:00', temperature: 34, condition: 'Sunny' },
              { time: '18:00', temperature: 30, condition: 'Clear' },
              { time: '21:00', temperature: 28, condition: 'Cloudy' },
              { time: '00:00', temperature: 26, condition: 'Clear' },
            ],
        daily: Array.isArray(response?.forecast)
          ? response.forecast.map((item: any, index: number) => ({
              date: item?.day
                ? new Date(item.day).toLocaleDateString('en-IN', { weekday: 'short' })
                : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index % 7],
              maxTemp: (item?.temperature ?? 30) + 5,
              minTemp: (item?.temperature ?? 30) - 5,
              rainfall: item?.rainfall ?? 0,
              condition: item?.condition ?? 'Sunny',
            }))
          : [
              { date: 'Mon', maxTemp: 35, minTemp: 25, rainfall: 0, condition: 'Sunny' },
              { date: 'Tue', maxTemp: 34, minTemp: 26, rainfall: 0, condition: 'Partly cloudy' },
              { date: 'Wed', maxTemp: 33, minTemp: 25, rainfall: 2, condition: 'Rainy' },
              { date: 'Thu', maxTemp: 32, minTemp: 24, rainfall: 0, condition: 'Cloudy' },
              { date: 'Fri', maxTemp: 34, minTemp: 26, rainfall: 0, condition: 'Sunny' },
              { date: 'Sat', maxTemp: 35, minTemp: 27, rainfall: 0, condition: 'Sunny' },
              { date: 'Sun', maxTemp: 34, minTemp: 26, rainfall: 0, condition: 'Partly cloudy' },
            ],
      };
      
      setWeather(safeData);
    } catch (err: any) {
      console.error('Weather fetch error:', err);
      const message = err?.message || 'Failed to load weather data';
      setError(message);
      toast.error(message);
      
      // Fallback mock data
      setWeather({
        location: location,
        temperature: 32,
        humidity: 65,
        windSpeed: 12,
        rainfall: 0,
        description: 'Partly cloudy',
        icon: '02d',
        current: {
          temperature: 32,
          humidity: 65,
          windSpeed: 12,
          rainfall: 0,
          condition: 'Partly cloudy',
          icon: '02d',
        },
        hourly: [
          { time: '12:00', temperature: 32, condition: 'Partly cloudy' },
          { time: '15:00', temperature: 34, condition: 'Sunny' },
          { time: '18:00', temperature: 30, condition: 'Clear' },
          { time: '21:00', temperature: 28, condition: 'Cloudy' },
          { time: '00:00', temperature: 26, condition: 'Clear' },
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
    if (searchQuery.trim()) {
      if (isAuthenticated) {
        setLocation(searchQuery);
        toast.success(`Weather updated for ${searchQuery}`);
      } else {
        toast.error('Please login to search custom locations');
        setSearchQuery('');
      }
    }
  };

  const getWeatherIcon = (condition?: string) => {
    const safeCondition = (condition || '').toLowerCase();
    if (safeCondition.includes('rain')) return CloudRain;
    if (safeCondition.includes('cloud')) return Cloud;
    if (safeCondition.includes('sun') || safeCondition.includes('clear')) return Sun;
    return CloudSun;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500" />
      </div>
    );
  }

  if (!weather) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Failed to load weather data. Please try again.</p>
        <button onClick={fetchWeather} className="mt-4 btn-primary">
          Retry
        </button>
      </div>
    );
  }

  const WeatherIcon = getWeatherIcon(weather?.description);

  return (
    <div className="px-6 lg:px-8 py-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Weather Forecast
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Get accurate weather predictions for your farm
        </p>
      </div>

      {/* Search */}
      <form onSubmit={handleSearch} className="mb-8">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isAuthenticated ? "Search location..." : "Login to search locations"}
            disabled={!isAuthenticated}
            className="input pl-10 pr-24 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!isAuthenticated || !searchQuery.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-emerald-500 text-white text-sm font-medium rounded-lg hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Search
          </button>
        </div>
      </form>

      {error && (
        <div className="mb-8 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-900/50 dark:bg-amber-900/20 dark:text-amber-200">
          Showing fallback weather because live data could not be loaded: {error}
        </div>
      )}

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
              <span className="text-lg font-medium">{weather?.location}</span>
            </div>
            <span className="text-sm opacity-80">
              {new Date().toLocaleDateString('en-IN', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric' 
              })}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-4">
                <WeatherIcon className="w-24 h-24" />
                <div>
                  <p className="text-7xl font-bold">
                    {weather?.temperature ?? 32}°
                  </p>
                  <p className="text-xl opacity-90">
                    {weather?.description || 'Partly cloudy'}
                  </p>
                </div>
              </div>
            </div>
            <div className="hidden md:grid grid-cols-2 gap-4 text-sm">
              <div className="bg-white/20 rounded-xl p-3">
                <p className="opacity-80">Humidity</p>
                <p className="text-xl font-semibold">{weather?.humidity ?? 65}%</p>
              </div>
              <div className="bg-white/20 rounded-xl p-3">
                <p className="opacity-80">Wind</p>
                <p className="text-xl font-semibold">{weather?.windSpeed ?? 12} km/h</p>
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
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Hourly Forecast
          </h3>
          <div className="space-y-4">
            {(weather?.hourly || []).length > 0 ? (weather?.hourly || []).map((hour: any, index: number) => {
              const HourIcon = getWeatherIcon(hour?.condition);
              return (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-500 w-16">{hour?.time || '--:--'}</span>
                  <HourIcon className="w-6 h-6 text-amber-500" />
                  <span className="font-medium text-gray-900 dark:text-white">
                    {hour?.temperature ?? 30}°
                  </span>
                </div>
              );
            }) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">Hourly forecast is unavailable.</p>
            )}
          </div>
        </motion.div>

        {/* 7-Day Forecast */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-3 card p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            7-Day Forecast
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {(weather?.daily || []).length > 0 ? (weather?.daily || []).map((day: any, index: number) => {
              const DayIcon = getWeatherIcon(day?.condition);
              return (
                <div key={index} className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                    {day?.date || '---'}
                  </p>
                  <DayIcon className="w-10 h-10 mx-auto mb-2 text-amber-500" />
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    {day?.maxTemp ?? 35}°
                  </p>
                  <p className="text-sm text-gray-500">{day?.minTemp ?? 25}°</p>
                  {(day?.rainfall ?? 0) > 0 && (
                    <p className="text-xs text-blue-500 mt-1">{day.rainfall}mm rain</p>
                  )}
                </div>
              );
            }) : (
              <p className="col-span-full text-sm text-gray-500 dark:text-gray-400">7-day forecast is unavailable.</p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
