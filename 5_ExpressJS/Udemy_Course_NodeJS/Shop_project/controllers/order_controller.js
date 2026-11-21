// admin/orders.ejs expects: orders = [ { id, date, status, customer, shipping, paymentMethod, items, total } ]

const Cart = require('../models/cart_model')
const Order = require('../models/order_model')

const PAYMENT_METHODS = ['cash-on-delivery', 'bank-transfer']

const getOrdersPage = async (req, res) => {
    const orders = await Order.fetchAll()
    res.render('admin/orders', { pageTitle: 'Orders', orders })
}

const createOrder = async (req, res) => {
    const { email, fullName, address, city, postalCode, country, paymentMethod } = req.body
    const text = (v) => String(v || '').trim()

    
    const fields = { email, fullName, address, city, postalCode, country }
    const missing = Object.values(fields).some((v) => !text(v))
    if (missing || !PAYMENT_METHODS.includes(paymentMethod)) {
        return res.redirect('/checkout')
    }

    const items = await Cart.getItems()
    if (items.length === 0) {
        return res.redirect('/cart')
    }

    const order = await Order.create({
        items,
        customer: { name: text(fullName), email: text(email) },
        shipping: {
            address: text(address),
            city: text(city),
            postalCode: text(postalCode),
            country: text(country),
        },
        paymentMethod,
    })

    await Cart.clear()
    res.redirect(`/order-confirmation/${order.id}`)
}

const getOrderConfirmationPage = async (req, res, next) => {
    const order = await Order.fetchById(req.params.orderId)
    if (!order) return next() // falls through to the 404 page
    res.render('shop/order-confirmation', { pageTitle: 'Order placed', order })
}

const updateOrderStatus = async (req, res) => {
    await Order.updateStatus(req.body.orderId, req.body.status)
    res.redirect('/admin/orders')
}

exports.getOrdersPage = getOrdersPage;
exports.createOrder = createOrder;
exports.getOrderConfirmationPage = getOrderConfirmationPage;
exports.updateOrderStatus = updateOrderStatus;
