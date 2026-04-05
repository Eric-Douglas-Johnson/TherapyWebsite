const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MAX_LOGIN_ATTEMPTS = 5;
const LOCK_TIME_MS = 15 * 60 * 1000; // 15 minutes

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin', 'therapist'], default: 'user' },
  failedLoginAttempts: { type: Number, default: 0 },
  lockUntil: { type: Date, default: null }
});

UserSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
});

UserSchema.methods.comparePassword = function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

UserSchema.methods.isLocked = function () {
  return this.lockUntil && this.lockUntil > Date.now();
};

UserSchema.methods.handleFailedLogin = async function () {
  const attempts = this.failedLoginAttempts + 1;
  const update = { failedLoginAttempts: attempts };
  if (attempts >= MAX_LOGIN_ATTEMPTS) {
    update.lockUntil = new Date(Date.now() + LOCK_TIME_MS);
  }
  await this.updateOne(update);
};

UserSchema.methods.resetLoginAttempts = async function () {
  await this.updateOne({ failedLoginAttempts: 0, lockUntil: null });
};

module.exports = mongoose.model('User', UserSchema);
