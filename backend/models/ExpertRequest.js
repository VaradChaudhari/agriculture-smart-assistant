const mongoose = require('mongoose');

const expertRequestSchema = new mongoose.Schema({
  farmer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  issue: {
    type: String,
    required: [true, 'Issue description is required'],
    trim: true,
  },
  cropType: {
    type: String,
    required: [true, 'Crop type is required'],
    trim: true,
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true,
  },
  preferredTime: {
    type: String,
    required: [true, 'Preferred time is required'],
  },
  status: {
    type: String,
    enum: ['pending', 'assigned', 'resolved', 'cancelled'],
    default: 'pending',
  },
  assignedExpert: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  notes: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('ExpertRequest', expertRequestSchema);