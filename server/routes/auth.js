const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const signToken = (user) =>
  jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: 'Email already registered' });
    const user = await new User({ email, password }).save();
    res.status(201).json({ token: signToken(user), user: { id: user._id, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.json({ token: signToken(user), user: { id: user._id, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
