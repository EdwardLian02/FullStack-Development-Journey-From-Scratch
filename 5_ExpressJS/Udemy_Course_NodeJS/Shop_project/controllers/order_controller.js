// No Order model exists yet, so these handlers render/redirect only.
// admin/orders.ejs expects: orders = [ { id, date, status, customer, shipping, paymentMethod, items, total } ]

const getOrdersPage = (req, res) => {
    res.render('admin/orders', { pageTitle: 'Orders', orders: [] })
}

const createOrder = (req, res) => {
    // TODO: build an order from the cart + req.body (email, fullName, address, city,
    // postalCode, country, paymentMethod), save it, then clear the cart
    res.redirect('/')
}

const updateOrderStatus = (req, res) => {
    // TODO: set the status of order req.body.orderId to req.body.status
    res.redirect('/admin/orders')
}

exports.getOrdersPage = getOrdersPage;
exports.createOrder = createOrder;
exports.updateOrderStatus = updateOrderStatus;
