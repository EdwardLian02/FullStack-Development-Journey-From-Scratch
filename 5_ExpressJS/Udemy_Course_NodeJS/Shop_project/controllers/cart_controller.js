// Views expect: cart = { items: [ { product: {id, title, price, imageUrl}, qty } ] }

const Cart = require('../models/cart_model')

const getCartPage = async (req, res) => {
    const items = await Cart.getItems()
    res.render('shop/cart', { pageTitle: 'Your Cart', cart: { items } })
}

const addToCart = async (req, res, next) => {
    const {productId, qty} = req.body;
    await Cart.addProduct(productId, qty);
    res.redirect('/cart')
}

const deleteCartItem =async (req, res) => {
    await Cart.removeFromCart(req.body.productId)
    res.redirect('/cart')
}

const getCheckoutPage = async (req, res) => {
    const items = await Cart.getItems()
    res.render('shop/checkout', { pageTitle: 'Checkout', cart: { items } })
}

exports.getCartPage = getCartPage;
exports.addToCart = addToCart;
exports.deleteCartItem = deleteCartItem;
exports.getCheckoutPage = getCheckoutPage;
