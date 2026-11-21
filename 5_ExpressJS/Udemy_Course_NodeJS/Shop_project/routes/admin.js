const express = require('express');
const { products,
    getAddProductPage,
    addProduct,
    getIndexPage, 
    getEditProductPage,
    getProductDetail,
    getAllProductAdminPage,
} = require('../controllers/product_controller');
const { getOrdersPage, updateOrderStatus } = require('../controllers/order_controller');

const router = express.Router();

router.get('/index', getIndexPage)
router.get('/add-product', getAddProductPage )
router.post('/product', addProduct)
router.get('/edit-product', getEditProductPage)
router.get('/product-detail', getProductDetail)
router.get('/products', getAllProductAdminPage)
router.get('/orders', getOrdersPage)
router.post('/update-order-status', updateOrderStatus)

module.exports = {
    routes: router, 
    products: products
}