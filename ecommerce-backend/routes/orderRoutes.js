const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { placeOrder, getOrders } = require('../controllers/orderController');

router.post('/', auth, placeOrder);
router.get('/', auth, getOrders);

module.exports = router;



