const express = require('express');
const router = express.Router();
const {
  getWeather,
  getWeatherForecast,
} = require('../controllers/weatherController');

// Public routes
router.get('/:city', getWeather);
router.get('/forecast/:city', getWeatherForecast);

module.exports = router;