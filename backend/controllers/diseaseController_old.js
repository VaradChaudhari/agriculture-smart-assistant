const DiseaseScan = require('../models/DiseaseScan');
const cloudinary = require('../config/cloudinary');
const fs = require('fs');
const path = require('path');

// @desc    Upload and analyze disease
// @route   POST /api/disease/analyze
// @access  Private
const analyzeDisease = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded",
      });
    }

    console.log("Cloudinary upload starting...");

    const result = await cloudinary.uploader.upload(
      req.file.path
    );

    console.log("Cloudinary upload success");

    return res.status(200).json({
      success: true,

      diseaseName: "Leaf Blight",

      confidence: 94,

      imageUrl: result.secure_url,

      symptoms: [
        "Yellow leaf spots",
        "Leaf drying",
        "Brown patches",
      ],

      causes: [
        "Fungal infection",
        "High humidity",
        "Poor airflow",
      ],

      preventionTips: [
        "Avoid overwatering",
        "Use resistant seeds",
        "Maintain spacing",
      ],

      treatmentSuggestions: [
        "Apply fungicide spray",
        "Remove infected leaves",
        "Monitor crop regularly",
      ],
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get user's disease scans
// @route   GET /api/disease/scans
// @access  Private
const getUserScans = async (req, res, next) => {
  try {
    const scans = await DiseaseScan.find({ user: req.user._id })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: scans.length,
      data: scans,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all disease scans (admin)
// @route   GET /api/disease/all
// @access  Private/Admin
const getAllScans = async (req, res, next) => {
  try {
    const scans = await DiseaseScan.find()
      .populate('user', 'fullName email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: scans.length,
      data: scans,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete disease scan
// @route   DELETE /api/disease/:id
// @access  Private
const deleteScan = async (req, res, next) => {
  try {
    const scan = await DiseaseScan.findById(req.params.id);
    
    if (!scan) {
      return res.status(404).json({
        success: false,
        message: 'Scan not found',
      });
    }

    // Check ownership
    if (scan.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this scan',
      });
    }

    await scan.remove();

    res.json({
      success: true,
      message: 'Scan deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  analyzeDisease,
  getUserScans,
  getAllScans,
  deleteScan,
};