const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

const {
    getAllProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
  } = require('../controllers/productController');

router.get('/', getAllProducts);
router.get('/:id', getProduct);
router.post('/', verifyToken, upload.single('image'), createProduct);
router.put('/:id', verifyToken, updateProduct);
router.delete('/:id', verifyToken,deleteProduct);

module.exports = router;