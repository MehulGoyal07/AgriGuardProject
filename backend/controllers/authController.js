const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Generate JWT
const generateToken = (user) => {
  return jwt.sign(
    { 
      id: user._id,
      role: user.role 
    }, 
    process.env.JWT_SECRET, 
    {
      expiresIn: '7d',
    }
  );
};

// @desc    Register new user
const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || 'user' // Default to 'user' if role not specified
    });

    // Generate token
    const token = generateToken(user);

    // Send response
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// @desc    Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({ message: 'Account is inactive' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = generateToken(user);

    const responseData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token
    };

    console.log('Login Response Data:', responseData); // Debug log

    // Send response
    res.status(200).json(responseData);
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error during login' });
  }
};

// @desc    Get current user
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error('Get user error:', err);
    res.status(500).json({ message: 'Server error while fetching user' });
  }
};

// @desc    Google OAuth Login
const googleAuth = async (req, res) => {
  const { token } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const { name, email } = ticket.getPayload();

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ 
        name, 
        email, 
        isGoogleUser: true 
      });
    }

    const jwtToken = generateToken(user);
    res.status(200).json({ 
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: jwtToken 
    });
  } catch (err) {
    console.error('Google auth error:', err);
    res.status(500).json({ message: 'Google auth failed' });
  }
};

// @desc    Forgot Password
const forgotPassword = async (req, res) => {
  // You can implement email OTP or reset link flow here
  res.status(200).json({ message: 'Password reset link sent (mock)' });
};

// @desc    Reset Password
const resetPassword = async (req, res) => {
  // Accepts token and newPassword from frontend
  res.status(200).json({ message: 'Password reset successful (mock)' });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
  googleAuth,
  forgotPassword,
  resetPassword,
};