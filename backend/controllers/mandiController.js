// Mock data for mandi rates - replace with real API integration
const mockMandiData = [
  {
    crop: 'Wheat',
    market: 'Delhi',
    price: 2200,
    unit: 'per quintal',
    change: '+50',
    trend: 'up',
    region: 'North India',
  },
  {
    crop: 'Rice',
    market: 'Mumbai',
    price: 3500,
    unit: 'per quintal',
    change: '-20',
    trend: 'down',
    region: 'West India',
  },
  {
    crop: 'Cotton',
    market: 'Gujarat',
    price: 5800,
    unit: 'per quintal',
    change: '+100',
    trend: 'up',
    region: 'West India',
  },
  {
    crop: 'Sugarcane',
    market: 'UP',
    price: 280,
    unit: 'per quintal',
    change: '+10',
    trend: 'up',
    region: 'North India',
  },
  {
    crop: 'Maize',
    market: 'Punjab',
    price: 1800,
    unit: 'per quintal',
    change: '-30',
    trend: 'down',
    region: 'North India',
  },
];

// @desc    Get mandi rates
// @route   GET /api/mandi
// @access  Public
const getMandiRates = async (req, res, next) => {
  try {
    // In production, fetch from real mandi API
    // For now, return mock data
    res.json({
      success: true,
      data: mockMandiData,
      lastUpdated: new Date().toISOString(),
      note: 'Mock data - integrate with real mandi API for production',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get mandi rates by crop
// @route   GET /api/mandi/crop/:crop
// @access  Public
const getMandiRatesByCrop = async (req, res, next) => {
  try {
    const { crop } = req.params;
    const filteredData = mockMandiData.filter(
      item => item.crop.toLowerCase() === crop.toLowerCase()
    );

    res.json({
      success: true,
      data: filteredData,
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get mandi rates by region
// @route   GET /api/mandi/region/:region
// @access  Public
const getMandiRatesByRegion = async (req, res, next) => {
  try {
    const { region } = req.params;
    const filteredData = mockMandiData.filter(
      item => item.region.toLowerCase().includes(region.toLowerCase())
    );

    res.json({
      success: true,
      data: filteredData,
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMandiRates,
  getMandiRatesByCrop,
  getMandiRatesByRegion,
};