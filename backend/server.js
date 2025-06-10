const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const roots = require('./roots/root');
const dotenv = require('dotenv');

dotenv.config();


const allowedOrigins = [
  'http://localhost:3000',
  process.env.CLIENT_URL
].filter(Boolean);

const corsOptions = {
  origin: allowedOrigins,
  methods: "GET,PATCH,PUT,DELETE,POST,HEAD"
};


app.use(express.json());
app.use(cors(corsOptions));

// Serve static files
app.use('/productlist/uploads', express.static(path.join(__dirname, '/productlist/uploads')));

// API routes
app.use('/api', roots);




mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('DB Connected');
  app.listen(5000, () => console.log('Server has started on port 5000'));
})
.catch((err) => {
  console.error('DB Connection Error:', err);
});

