const express = require('express');
const router = express.Router();
const Appointment = require('../models/appointment');

// GET appointments
// admin: all appointments
// therapist: only their own
router.get('/', async (req, res) => {
  try {
    const filter = req.user.role === 'therapist' ? { therapistId: req.user.id } : {};
    const appointments = await Appointment.find(filter)
      .populate('therapistId', 'email')
      .sort({ date: 1 });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new appointment — therapistId must be provided in the request body
router.post('/', async (req, res) => {
  try {
    const appointment = new Appointment({
      ...req.body,
      therapistId: req.body.therapistId
    });
    const saved = await appointment.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH update appointment — therapist can only update their own
router.patch('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
    if (req.user.role === 'therapist' && appointment.therapistId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    Object.assign(appointment, req.body);
    const updated = await appointment.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE appointment — therapist can only delete their own
router.delete('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
    if (req.user.role === 'therapist' && appointment.therapistId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    await appointment.deleteOne();
    res.json({ message: 'Appointment deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
