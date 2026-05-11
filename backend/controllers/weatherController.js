const axios = require('axios');
const WeatherCache = require('../models/WeatherCache');

const buildFallbackWeather = (city = 'Ahmedabad') => ({
  city,
  country: 'IN',
  temperature: 32,
  feelsLike: 34,
  humidity: 65,
  pressure: 1013,
  windSpeed: 12,
  windDirection: 180,
  rainfall: 0,
  description: 'Partly cloudy',
  icon: '02d',
  sunrise: Math.floor(Date.now() / 1000) - 6 * 60 * 60,
  sunset: Math.floor(Date.now() / 1000) + 6 * 60 * 60,
  coordinates: {
    lat: 23.0225,
    lon: 72.5714,
  },
});

const buildFallbackForecast = () => {
  const baseDate = new Date();
  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(baseDate);
    date.setDate(baseDate.getDate() + index);

    return {
      date: date.toISOString(),
      temperature: 30 + (index % 4),
      humidity: 60 + index,
      rainfall: index === 2 ? 2 : 0,
      description: index === 2 ? 'Light rain' : index % 2 === 0 ? 'Sunny' : 'Partly cloudy',
      icon: index === 2 ? '10d' : index % 2 === 0 ? '01d' : '02d',
      windSpeed: 8 + index,
    };
  });
};

// @desc    Get weather data
// @route   GET /api/weather/:city
// @access  Public
const getWeather = async (req, res, next) => {
  try {
    const city = req.params.city?.trim();
    const apiKey = process.env.OPENWEATHER_API_KEY;

    if (!city) {
      return res.status(400).json({
        success: false,
        message: 'City is required',
      });
    }

    if (!apiKey || apiKey === 'your_openweather_api_key') {
      return res.json({
        success: true,
        data: buildFallbackWeather(city),
        cached: false,
        fallback: true,
      });
    }

    // Check cache first
    const cachedData = await WeatherCache.findOne({ city });
    if (cachedData && (Date.now() - cachedData.lastUpdated) < 30 * 60 * 1000) { // 30 minutes
      return res.json({
        success: true,
        data: cachedData.data,
        cached: true,
      });
    }

    // Fetch from OpenWeather API
    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        q: city,
        appid: apiKey,
        units: 'metric',
      },
      timeout: 10000,
    });

    const apiData = response.data || {};
    const main = apiData.main || {};
    const wind = apiData.wind || {};
    const weather = Array.isArray(apiData.weather) ? apiData.weather[0] || {} : {};
    const sys = apiData.sys || {};
    const coord = apiData.coord || {};

    const weatherData = {
      city: apiData.name || city,
      country: sys.country || '',
      temperature: main.temp ?? null,
      feelsLike: main.feels_like ?? null,
      humidity: main.humidity ?? null,
      pressure: main.pressure ?? null,
      windSpeed: wind.speed ?? 0,
      windDirection: wind.deg ?? 0,
      rainfall: apiData.rain?.['1h'] || apiData.rain?.['3h'] || 0,
      description: weather.description || 'Weather unavailable',
      icon: weather.icon || '02d',
      sunrise: sys.sunrise ?? null,
      sunset: sys.sunset ?? null,
      coordinates: {
        lat: coord.lat ?? null,
        lon: coord.lon ?? null,
      },
    };

    // Cache the data
    await WeatherCache.findOneAndUpdate(
      { city },
      { data: weatherData, lastUpdated: new Date() },
      { upsert: true, new: true }
    );

    res.json({
      success: true,
      data: weatherData,
      cached: false,
    });
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return res.status(404).json({
        success: false,
        message: 'City not found',
      });
    }
    next(error);
  }
};

// @desc    Get weather forecast
// @route   GET /api/weather/forecast/:city
// @access  Public
const getWeatherForecast = async (req, res, next) => {
  try {
    const city = req.params.city?.trim();
    const apiKey = process.env.OPENWEATHER_API_KEY;

    if (!city) {
      return res.status(400).json({
        success: false,
        message: 'City is required',
      });
    }

    if (!apiKey || apiKey === 'your_openweather_api_key') {
      return res.json({
        success: true,
        data: {
          city,
          country: 'IN',
          forecast: buildFallbackForecast(),
        },
        fallback: true,
      });
    }

    const response = await axios.get('https://api.openweathermap.org/data/2.5/forecast', {
      params: {
        q: city,
        appid: apiKey,
        units: 'metric',
      },
      timeout: 10000,
    });

    const forecast = (response.data?.list || []).map(item => ({
      date: item?.dt_txt || new Date().toISOString(),
      temperature: item?.main?.temp ?? null,
      humidity: item?.main?.humidity ?? null,
      rainfall: item?.rain?.['3h'] || 0,
      description: item?.weather?.[0]?.description || 'Weather unavailable',
      icon: item?.weather?.[0]?.icon || '02d',
      windSpeed: item?.wind?.speed ?? 0,
    }));

    res.json({
      success: true,
      data: {
        city: response.data?.city?.name || city,
        country: response.data?.city?.country || '',
        forecast,
      },
    });
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return res.status(404).json({
        success: false,
        message: 'City not found',
      });
    }
    next(error);
  }
};

module.exports = {
  getWeather,
  getWeatherForecast,
};
