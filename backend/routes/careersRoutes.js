const express = require('express');
const router = express.Router();
const {
  submitApplication,
  getApplications,
  updateApplicationStatus,
  deleteApplication,
} = require('../controllers/careersController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Public route
router.post('/apply', upload.single('resume'), submitApplication);

// Admin routes
router.use(authMiddleware);
router.use(roleMiddleware('admin'));
router.get('/applications', getApplications);
router.put('/:id/status', updateApplicationStatus);
router.delete('/:id', deleteApplication);

module.exports = router;