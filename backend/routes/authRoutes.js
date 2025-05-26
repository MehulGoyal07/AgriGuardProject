const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
  googleAuth,
  forgotPassword,
  resetPassword
} = require('../controllers/authController');

const { protect, admin } = require('../middlewares/authMiddleware');

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/google', googleAuth);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

// Protected routes
router.get('/me', protect, getMe);

module.exports = router;
