const ExpertRequest = require('../models/ExpertRequest');

// @desc    Create expert request
// @route   POST /api/experts/request
// @access  Private
const createExpertRequest = async (req, res, next) => {
  try {
    const { issue, cropType, location, preferredTime } = req.body;

    const request = await ExpertRequest.create({
      farmer: req.user._id,
      issue,
      cropType,
      location,
      preferredTime,
    });

    res.status(201).json({
      success: true,
      message: 'Expert consultation request submitted successfully',
      data: request,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user's expert requests
// @route   GET /api/experts/my-requests
// @access  Private
const getUserRequests = async (req, res, next) => {
  try {
    const requests = await ExpertRequest.find({ farmer: req.user._id })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: requests.length,
      data: requests,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all expert requests (admin/expert)
// @route   GET /api/experts/all
// @access  Private/Admin/Expert
const getAllRequests = async (req, res, next) => {
  try {
    const requests = await ExpertRequest.find()
      .populate('farmer', 'fullName email mobileNumber location')
      .populate('assignedExpert', 'fullName email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: requests.length,
      data: requests,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update request status (admin/expert)
// @route   PUT /api/experts/:id/status
// @access  Private/Admin/Expert
const updateRequestStatus = async (req, res, next) => {
  try {
    const { status, notes, assignedExpert } = req.body;

    const request = await ExpertRequest.findByIdAndUpdate(
      req.params.id,
      {
        status,
        notes,
        assignedExpert,
      },
      { new: true, runValidators: true }
    ).populate('farmer assignedExpert');

    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Request not found',
      });
    }

    res.json({
      success: true,
      data: request,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete expert request
// @route   DELETE /api/experts/:id
// @access  Private
const deleteRequest = async (req, res, next) => {
  try {
    const request = await ExpertRequest.findById(req.params.id);
    
    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Request not found',
      });
    }

    // Check ownership or admin
    if (request.farmer.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this request',
      });
    }

    await request.remove();

    res.json({
      success: true,
      message: 'Request deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createExpertRequest,
  getUserRequests,
  getAllRequests,
  updateRequestStatus,
  deleteRequest,
};