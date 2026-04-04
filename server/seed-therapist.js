require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/user');

async function seedTherapist() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('MongoDB connected');

  const email = 'therapist@therapywebsite.com';
  const password = 'Therapist123!';

  const existing = await User.findOne({ email });
  if (existing) {
    existing.role = 'therapist';
    await existing.save();
    console.log('Existing user updated to therapist');
  } else {
    await new User({ email, password, role: 'therapist' }).save();
    console.log('Therapist user created');
    console.log('Email:', email);
    console.log('Password:', password);
  }

  await mongoose.disconnect();
  process.exit(0);
}

seedTherapist().catch(err => { console.error(err); process.exit(1); });
