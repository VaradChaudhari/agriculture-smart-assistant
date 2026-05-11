const express = require('express');
const router = express.Router();
const {
  createExpertRequest,
  getUserRequests,
  getAllRequests,
  updateRequestStatus,
  deleteRequest,
} = require('../controllers/expertController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// All routes require authentication
router.use(authMiddleware);

// User routes
router.post('/request', createExpertRequest);
router.get('/my-requests', getUserRequests);
router.delete('/:id', deleteRequest);

// Admin/Expert routes
router.get('/all', roleMiddleware('admin', 'expert'), getAllRequests);
router.put('/:id/status', roleMiddleware('admin', 'expert'), updateRequestStatus);

module.exports = router;