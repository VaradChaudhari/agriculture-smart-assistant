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
  cropName: {
    type: String,
    default: 'Unknown crop',
    trim: true,
  },
  diseaseName: {
    type: String,
    required: true,
    trim: true,
  },
  confidence: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  severity: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    required: true,
  },
  symptoms: {
    type: [String],
    default: [],
  },
  causes: {
    type: [String],
    default: [],
  },
  preventionTips: {
    type: [String],
    default: [],
  },
  treatmentSuggestions: {
    type: [String],
    default: [],
  },
  treatment: {
    type: String,
    default: '',
  },
  prevention: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  aiModel: {
    type: String,
    default: 'default',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('DiseaseScan', diseaseScanSchema);
