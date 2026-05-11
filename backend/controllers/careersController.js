const CareerApplication = require('../models/CareerApplication');
const cloudinary = require('../config/cloudinary');
const fs = require('fs');

// @desc    Submit career application
// @route   POST /api/careers/apply
// @access  Public
const submitApplication = async (req, res, next) => {
  try {
    const { applicantName, email, roleApplied, experience, portfolio } = req.body;

    let resumeUrl = '';
    if (req.file) {
      // Upload resume to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'career_applications',
        resource_type: 'raw',
      });

      resumeUrl = result.secure_url;

      // Remove file from local uploads
      fs.unlinkSync(req.file.path);
    }

    const application = await CareerApplication.create({
      applicantName,
      email,
      roleApplied,
      resume: resumeUrl,
      experience,
      portfolio,
    });

    res.status(201).json({
      success: true,
      message: 'Career application submitted successfully',
      data: application,
    });
  } catch (error) {
    // Clean up file if upload failed
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    next(error);
  }
};

// @desc    Get all applications (admin)
// @route   GET /api/careers/applications
// @access  Private/Admin
const getApplications = async (req, res, next) => {
  try {
    const applications = await CareerApplication.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: applications.length,
      data: applications,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update application status (admin)
// @route   PUT /api/careers/:id/status
// @access  Private/Admin
const updateApplicationStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const application = await CareerApplication.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found',
      });
    }

    res.json({
      success: true,
      data: application,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete application (admin)
// @route   DELETE /api/careers/:id
// @access  Private/Admin
const deleteApplication = async (req, res, next) => {
  try {
    const application = await CareerApplication.findById(req.params.id);
    
    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found',
      });
    }

    await application.remove();

    res.json({
      success: true,
      message: 'Application deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitApplication,
  getApplications,
  updateApplicationStatus,
  deleteApplication,
};