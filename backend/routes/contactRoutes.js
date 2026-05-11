const express = require('express');
const router = express.Router();
const {
  submitContact,
  getContacts,
  markAsRead,
  deleteContact,
} = require('../controllers/contactController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Public route
router.post('/', submitContact);

// Admin routes
router.use(authMiddleware);
router.use(roleMiddleware('admin'));
router.get('/', getContacts);
router.put('/:id/read', markAsRead);
router.delete('/:id', deleteContact);

module.exports = router;