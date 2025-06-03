const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your_secret_key';
const User = require('../model/usermodel');
const bcrypt = require('bcrypt');

app.use(express.json());
app.use(cors());

// Register Controller
exports.register = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const hashpassword = await bcrypt.hash(password, 10);
    const registered = new User({ email, username, password: hashpassword });
    await registered.save();

    res.status(201).json({ message: 'Successfully registered' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Login Controller
exports.login= async (req, res) => {
  try {
    const { email, password } = req.body;
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res.status(401).json({ message: 'Invalid Email Name' });
    }

    const verify = await bcrypt.compare(password, checkUser.password);
    if (!verify) {
      return res.status(401).json({ message: 'Invalid Password' });
    }

    const token = jwt.sign({ userId: checkUser._id }, SECRET_KEY, { expiresIn: '1h' });
    res.status(200).json({
      token,
      user: {
        userId: checkUser._id,
        username: checkUser.username,
        email: checkUser.email,
        role: checkUser.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


