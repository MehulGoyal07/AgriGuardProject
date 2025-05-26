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
    console.log('Registration attempt:', { name, email, role }); // Debug log

    // Validate input
    if (!name || !email || !password) {
      console.log('Missing required fields:', { name: !!name, email: !!email, password: !!password });
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('User already exists:', email);
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
      role: role || 'user'
    });

    console.log('User created successfully:', user._id); // Debug log

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
    res.status(500).json({ 
      message: 'Server error during registration',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

// @desc    Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log('Login attempt:', { email }); // Debug log

    // Validate input
    if (!email || !password) {
      console.log('Missing credentials:', { email: !!email, password: !!password });
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found:', email);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if user is active
    if (!user.isActive) {
      console.log('Inactive user attempt:', email);
      return res.status(401).json({ message: 'Account is inactive' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Invalid password for user:', email);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    console.log('Login successful:', email); // Debug log

    // Generate token
    const token = generateToken(user);

    const responseData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token
    };

    // Send response
    res.status(200).json(responseData);
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ 
      message: 'Server error during login',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
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
    console.log('Google auth attempt'); // Debug log

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const { name, email } = ticket.getPayload();

    console.log('Google payload:', { name, email }); // Debug log

    let user = await User.findOne({ email });
    if (!user) {
      console.log('Creating new user from Google auth');
      user = await User.create({ 
        name, 
        email, 
        isGoogleUser: true 
      });
    }

    const jwtToken = generateToken(user);
    console.log('Google auth successful:', email); // Debug log

    res.status(200).json({ 
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: jwtToken 
    });
  } catch (err) {
    console.error('Google auth error:', err);
    res.status(500).json({ 
      message: 'Google auth failed',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

// @desc    Forgot Password
const forgotPassword = async (req, res) => {
  res.status(200).json({ message: 'Password reset link sent (mock)' });
};

// @desc    Reset Password
const resetPassword = async (req, res) => {
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