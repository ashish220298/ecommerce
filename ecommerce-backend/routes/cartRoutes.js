const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { getCart, addToCart } = require('../controllers/cartController');

router.get('/', auth, getCart);
router.post('/', auth, addToCart);

module.exports = router;
