require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/user');

async function seedAdmin() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('MongoDB connected');

  const email = 'e_d_johnson2003@yahoo.com';
  const password = 'lemonCommand22+';

  const existing = await User.findOne({ email });
  if (existing) {
    existing.role = 'admin';
    await existing.save();
    console.log('Existing user updated to admin');
  } else {
    await new User({ email, password, role: 'admin' }).save();
    console.log('Admin user created');
  }

  await mongoose.disconnect();
  process.exit(0);
}

seedAdmin().catch(err => { console.error(err); process.exit(1); });
