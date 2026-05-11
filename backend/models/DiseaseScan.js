const mongoose = require('mongoose');

const diseaseScanSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  diseaseName: {
    type: String,
    required: true,
  },
  confidence: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  treatment: {
    type: String,
    required: true,
  },
  prevention: {
    type: String,
    required: true,
  },
  aiModel: {
    type: String,
    default: 'default',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('DiseaseScan', diseaseScanSchema);