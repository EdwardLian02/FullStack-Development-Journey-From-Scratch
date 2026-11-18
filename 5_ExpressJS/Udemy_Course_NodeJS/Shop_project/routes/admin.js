const express = require('express');
const { products, getAddProductPage, addProduct } = require('../controllers/product_controller');

const router = express.Router();

router.get('/add-product', getAddProductPage )
router.post('/product', addProduct)

module.exports = {
    routes: router, 
    products: products
}