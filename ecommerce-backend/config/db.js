const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://Rubi_db:T2P9R5d5lWl7SRAF@cluster0.tvyoi.mongodb.net/group41Database');
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;