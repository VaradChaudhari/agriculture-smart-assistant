const express = require('express');
const router = express.Router();
const {
  getMandiRates,
  getMandiRatesByCrop,
  getMandiRatesByRegion,
} = require('../controllers/mandiController');

// Public routes
router.get('/', getMandiRates);
router.get('/crop/:crop', getMandiRatesByCrop);
router.get('/region/:region', getMandiRatesByRegion);

module.exports = router;