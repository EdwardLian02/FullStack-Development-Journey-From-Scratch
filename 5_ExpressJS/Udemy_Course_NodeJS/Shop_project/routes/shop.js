const express = require('express')
const path = require('path')
const rootDir = require('../util/path');
const { products } = require('../routes/admin');
const { getAllProductShopPage, getProductDetail } = require('../controllers/product_controller');
const { getCartPage, addToCart, deleteCartItem, getCheckoutPage } = require('../controllers/cart_controller');
const { createOrder, getOrderConfirmationPage } = require('../controllers/order_controller');


const router = express.Router();

router.get('/', getAllProductShopPage );
router.get('/products', getAllProductShopPage);
router.get('/products/:productId', getProductDetail);
router.get('/cart', getCartPage);
router.post('/cart', addToCart);
router.post('/cart-delete-item', deleteCartItem);
router.get('/checkout', getCheckoutPage);
router.post('/create-order', createOrder);
router.get('/order-confirmation/:orderId', getOrderConfirmationPage);


module.exports = router;