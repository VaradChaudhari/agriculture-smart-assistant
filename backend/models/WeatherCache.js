const mongoose = require('mongoose');

const weatherCacheSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
    unique: true,
  },
  data: {
    type: Object,
    required: true,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

// Update lastUpdated on save
weatherCacheSchema.pre('save', function(next) {
  this.lastUpdated = new Date();
  next();
});

module.exports = mongoose.model('WeatherCache', weatherCacheSchema);