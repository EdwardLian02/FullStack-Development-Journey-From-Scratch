// No Cart model exists yet, so these handlers render/redirect only.
// Views expect: cart = { items: [ { product: {id, title, price, imageUrl}, qty } ] }

const Cart = require('../models/cart_model')
const Product = require('../models/product_model')

const getCartPage = async (req, res) => {
    // cart.json stores references only: { products: [{ id, qty }] }
    // cart.ejs needs full product data, so join each entry with products.json
    const cart = await Cart.getCart();

    const lines = await Promise.all(
        cart.products.map(async ({ id, qty }) => {
            const product = await Product.fetchById(id)
            return product ? { product, qty } : null
        })
    )

    // drop entries whose product was deleted since it was added
    const items = lines.filter(Boolean)

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

const getCheckoutPage = (req, res) => {
    res.render('shop/checkout', { pageTitle: 'Checkout', cart: { items: [] } })
}

exports.getCartPage = getCartPage;
exports.addToCart = addToCart;
exports.deleteCartItem = deleteCartItem;
exports.getCheckoutPage = getCheckoutPage;
