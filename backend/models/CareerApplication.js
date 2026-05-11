const mongoose = require('mongoose');

const careerApplicationSchema = new mongoose.Schema({
  applicantName: {
    type: String,
    required: [true, 'Applicant name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'],
  },
  roleApplied: {
    type: String,
    required: [true, 'Role applied is required'],
    trim: true,
  },
  resume: {
    type: String,
    required: [true, 'Resume is required'],
  },
  experience: {
    type: String,
    required: [true, 'Experience is required'],
    trim: true,
  },
  portfolio: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'accepted', 'rejected'],
    default: 'pending',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('CareerApplication', careerApplicationSchema);