const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

router.post('/createproduct', auth, upload.single('image'), createProduct);
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.put('/:id', auth, updateProduct);
router.delete('/:id', auth, deleteProduct);

module.exports = router;