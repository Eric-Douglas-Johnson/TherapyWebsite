const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const RefreshToken = require('../models/refresh-token');

const ACCESS_TOKEN_EXPIRY = '15m';
const REFRESH_TOKEN_DAYS = 7;

const signAccessToken = (user) =>
  jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: ACCESS_TOKEN_EXPIRY }
  );

const cookieOptions = (maxAgeMs) => ({
  httpOnly: true,
  secure: true,
  sameSite: 'strict',
  maxAge: maxAgeMs,
  path: '/'
});

const setTokenCookies = async (res, user) => {
  // Access token — short-lived
  const accessToken = signAccessToken(user);
  res.cookie('accessToken', accessToken, cookieOptions(15 * 60 * 1000)); // 15 min

  // Refresh token — long-lived, stored in DB so it can be revoked
  const refreshToken = crypto.randomBytes(40).toString('hex');
  const expiresAt = new Date(Date.now() + REFRESH_TOKEN_DAYS * 24 * 60 * 60 * 1000);
  await RefreshToken.create({ userId: user._id, token: refreshToken, expiresAt });
  res.cookie('refreshToken', refreshToken, cookieOptions(REFRESH_TOKEN_DAYS * 24 * 60 * 60 * 1000));
};

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: 'Email already registered' });
    const user = await new User({ email, password }).save();
    await setTokenCookies(res, user);
    res.status(201).json({ user: { id: user._id, email: user.email, role: user.role } });
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

    // Generic message to prevent email enumeration
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    // Check account lockout
    if (user.isLocked()) {
      const minutesLeft = Math.ceil((user.lockUntil - Date.now()) / 60000);
      return res.status(423).json({
        message: `Account locked. Try again in ${minutesLeft} minute(s).`
      });
    }

    // Verify password
    const valid = await user.comparePassword(password);
    if (!valid) {
      await user.handleFailedLogin();
      const remaining = 5 - (user.failedLoginAttempts + 1);
      return res.status(401).json({
        message: remaining > 0
          ? `Invalid credentials. ${remaining} attempt(s) remaining.`
          : 'Account locked due to too many failed attempts. Try again in 15 minutes.'
      });
    }

    // Successful login — reset failed attempts
    await user.resetLoginAttempts();
    await setTokenCookies(res, user);
    res.json({ user: { id: user._id, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/auth/refresh — exchange refresh token for new access token
router.post('/refresh', async (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) return res.status(401).json({ message: 'No refresh token' });
  try {
    const stored = await RefreshToken.findOne({ token: refreshToken });
    if (!stored || stored.expiresAt < Date.now()) {
      return res.status(401).json({ message: 'Invalid or expired refresh token' });
    }
    const user = await User.findById(stored.userId);
    if (!user) return res.status(401).json({ message: 'User not found' });

    // Issue new access token (refresh token stays the same until logout)
    const accessToken = signAccessToken(user);
    res.cookie('accessToken', accessToken, cookieOptions(15 * 60 * 1000));
    res.json({ user: { id: user._id, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/auth/logout — revoke refresh token and clear cookies
router.post('/logout', async (req, res) => {
  const { refreshToken } = req.cookies;
  if (refreshToken) {
    await RefreshToken.deleteOne({ token: refreshToken });
  }
  res.clearCookie('accessToken', { path: '/' });
  res.clearCookie('refreshToken', { path: '/' });
  res.json({ message: 'Logged out' });
});

// GET /api/auth/me — check current auth status (used by frontend on page load)
router.get('/me', async (req, res) => {
  const { accessToken } = req.cookies;
  if (!accessToken) return res.status(401).json({ message: 'Not authenticated' });
  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    res.json({ user: { id: decoded.id, email: decoded.email, role: decoded.role } });
  } catch {
    res.status(401).json({ message: 'Token expired' });
  }
});

module.exports = router;
