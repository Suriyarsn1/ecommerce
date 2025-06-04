const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const roots = require('./roots/root');
const dotenv = require('dotenv');

dotenv.config();


const allowedOrigins = [
  'https://ecommerce-five-iota-68.vercel.app',
  'http://localhost:3000',
  process.env.CLIENT_URL
].filter(Boolean);

const corsOptions = {
  origin: allowedOrigins,
  methods: "GET,PATCH,PUT,DELETE,POST,HEAD"
};

// Security headers
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; font-src 'self' https://fonts.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; script-src 'self';"
  );
  next();
});

app.use(express.json());
app.use(cors(corsOptions));

// Serve static files
app.use('/productlist/uploads', express.static(path.join(__dirname, '/productlist/uploads')));

// API routes
app.use('/api', roots);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('DB Connected'))
  .catch((err) => console.log('DB Not Connected:', err));

// For standalone server (uncomment if needed)
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
