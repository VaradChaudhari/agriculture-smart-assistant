const axios = require('axios');
const WeatherCache = require('../models/WeatherCache');

// @desc    Get weather data
// @route   GET /api/weather/:city
// @access  Public
const getWeather = async (req, res, next) => {
  try {
    const { city } = req.params;
    const apiKey = process.env.OPENWEATHER_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        success: false,
        message: 'Weather API key not configured',
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
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    const weatherData = {
      city: response.data.name,
      country: response.data.sys.country,
      temperature: response.data.main.temp,
      feelsLike: response.data.main.feels_like,
      humidity: response.data.main.humidity,
      pressure: response.data.main.pressure,
      windSpeed: response.data.wind.speed,
      windDirection: response.data.wind.deg,
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon,
      sunrise: response.data.sys.sunrise,
      sunset: response.data.sys.sunset,
      coordinates: {
        lat: response.data.coord.lat,
        lon: response.data.coord.lon,
      },
    };

    // Cache the data
    await WeatherCache.findOneAndUpdate(
      { city },
      { data: weatherData },
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
    const { city } = req.params;
    const apiKey = process.env.OPENWEATHER_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        success: false,
        message: 'Weather API key not configured',
      });
    }

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
    );

    const forecast = response.data.list.map(item => ({
      date: item.dt_txt,
      temperature: item.main.temp,
      humidity: item.main.humidity,
      description: item.weather[0].description,
      icon: item.weather[0].icon,
      windSpeed: item.wind.speed,
    }));

    res.json({
      success: true,
      data: {
        city: response.data.city.name,
        country: response.data.city.country,
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