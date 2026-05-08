/**
 * Auth Controller
 * Handles admin login and account setup
 */

const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

/**
 * Generate JWT token for an admin ID
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// ─── POST /api/auth/login ─────────────────────────────────────────────────────
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    // Find admin by email
    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // Compare password
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    res.json({
      success: true,
      message: 'Login successful!',
      token: generateToken(admin._id),
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

// ─── POST /api/auth/setup ─────────────────────────────────────────────────────
// One-time setup to create the admin account (disable after first use)
const setup = async (req, res) => {
  try {
    const existingAdmin = await Admin.findOne();
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists.' });
    }

    const { email, password, name } = req.body;
    const admin = await Admin.create({ email, password, name });

    res.status(201).json({
      success: true,
      message: 'Admin created successfully!',
      token: generateToken(admin._id),
    });
  } catch (error) {
    console.error('Setup error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

// ─── GET /api/auth/me ─────────────────────────────────────────────────────────
const getMe = async (req, res) => {
  res.json({ success: true, admin: req.admin });
};

module.exports = { login, setup, getMe };
