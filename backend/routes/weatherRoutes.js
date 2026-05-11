const express = require('express');
const router = express.Router();
const {
  getWeather,
  getWeatherForecast,
} = require('../controllers/weatherController');

// Public routes
router.get('/forecast/:city', getWeatherForecast);
router.get('/:city', getWeather);

module.exports = router;
