const express = require('express');
const router = express.Router();
const {
  analyzeDisease,
  getUserScans,
  getAllScans,
  deleteScan,
} = require('../controllers/diseaseController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const upload = require('../middleware/uploadMiddleware');

// All routes require authentication
router.use(authMiddleware);

// Disease analysis
router.post('/analyze', upload.single('image'), analyzeDisease);

// User scans
router.get('/scans', getUserScans);
router.delete('/:id', deleteScan);

// Admin routes
router.get('/all', roleMiddleware('admin'), getAllScans);

module.exports = router;