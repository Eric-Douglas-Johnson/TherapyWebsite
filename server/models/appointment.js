const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  date: { type: Date, required: true },
  message: { type: String },
  therapistId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
