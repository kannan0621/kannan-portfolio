const express = require('express');
const router = express.Router();
const {
  getPortfolio,
  updatePortfolio,
  resetPortfolio,
  postContact,
  getMessages
} = require('../controllers/portfolioController');
const { verifyToken } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getPortfolio);
router.post('/contact', postContact);
router.get('/messages', getMessages); // Accessible to view contact database entries

// Protected CMS Admin routes
router.put('/', verifyToken, updatePortfolio);
router.post('/reset', verifyToken, resetPortfolio);

module.exports = router;
