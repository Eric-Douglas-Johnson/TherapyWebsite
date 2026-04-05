require('dotenv').config();
const fs = require('fs');
const path = require('path');
const https = require('https');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const authMiddleware = require('./middleware/auth');

const app = express();

connectDB();

// CORS must allow credentials for cookies to work cross-origin
app.use(cors({
  origin: 'https://localhost:4200',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/appointments', authMiddleware, require('./routes/appointments'));

const PORT = process.env.PORT || 3000;
const HTTPS_PORT = process.env.HTTPS_PORT || 3443;

const certPath = path.join(__dirname, 'certs', 'cert.pem');
const keyPath = path.join(__dirname, 'certs', 'key.pem');

if (fs.existsSync(certPath) && fs.existsSync(keyPath)) {
  const sslOptions = {
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(certPath)
  };
  https.createServer(sslOptions, app).listen(HTTPS_PORT, () => {
    console.log(`HTTPS server running on port ${HTTPS_PORT}`);
  });

  const redirect = express();
  redirect.use((req, res) => {
    res.redirect(`https://${req.hostname}:${HTTPS_PORT}${req.url}`);
  });
  redirect.listen(PORT, () => {
    console.log(`HTTP redirect server on port ${PORT} -> HTTPS ${HTTPS_PORT}`);
  });
} else {
  app.listen(PORT, () => {
    console.log(`WARNING: No SSL certs found. Running insecure HTTP on port ${PORT}`);
  });
}
