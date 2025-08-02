const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
require('dotenv').config(); // Loads variables from .env file into process.env
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // serve images //  this express.static is a inbuilt middleware which serves static files like images , pdf
// both processses were runnign on same port 3000 thats unique in express
//clustering in node js
//support bson drvic need to be learn
require('./jobs/cronTasks');
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 5000;
const connectDB = require('./config/db'); // your db.js
connectDB();

console.log('Mongo URI:', process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true , 
    maxPoolSize: 10, // 🔁 Number of connections in the pool
    minPoolSize: 2,
    serverSelectionTimeoutMS: 5000
    })
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => console.error(err));
