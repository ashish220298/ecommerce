const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config()  // Loads variables from .env file into process.env

exports.register = async (req, res) => {

  const { name, email, password,isAdmin } = req.body;
  try {
    const user = new User({ name, email, password,isAdmin });
    await user.save();
    res.status(201).json({ msg: 'User registered' });
  } catch (err) {
    res.status(400).json({ msg: 'Error registering user', error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password ,role} = req.body;
  try {
    const user = await User.findOne({ email });
    
    if (!user) return res.status(400).json({ msg: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });
    console.log(process.env.JWT_SECRET)
    console.log(process.env.JWT_EXPIRE)

    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET,
  { expiresIn: process.env.JWT_EXPIRE });
   
    res.json({ token });

  } catch (err) {
    console.log(err)
    res.status(500).json({ msg: 'Server error' });
  }
};