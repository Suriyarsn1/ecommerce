const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const roots = require('./roots/root');
const dotenv = require('dotenv');

dotenv.config();

const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  methods: "GET,PATCH,PUT,DELETE,POST,HEAD"
};
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; font-src 'self' https://fonts.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; script-src 'self';"
  );
  next();
});

app.use(express.json());
app.use(cors(corsOptions));
app.use('/productlist/uploads', express.static(path.join(__dirname, '/productlist/uploads')));
app.use('/api', roots);

mongoose.connect(
  process.env.MONGODB_URL || 'mongodb+srv://suriyarsn1:Suriya.rsn1@cluster0.0yqiajj.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0'
).then(() => {
  console.log('db Connected');
}).catch((err) => {
  console.log('not connected', err);
});

// app.listen('5000')
// Do NOT call app.listen()

module.exports = app;
