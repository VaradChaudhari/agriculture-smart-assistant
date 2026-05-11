const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// All routes require authentication
router.use(authMiddleware);

// Admin only routes
router.get('/', roleMiddleware('admin'), getUsers);
// router.get('/stats', roleMiddleware('admin'), getAdminStats);
router.delete('/:id', roleMiddleware('admin'), deleteUser);

// User routes (own profile or admin)
router.get('/:id', getUser);
router.put('/:id', updateUser);

module.exports = router;