const fs = require('fs/promises')
const path = require('path')
const rootDir = require('../util/path')

const ordersPath = path.join(rootDir, 'data', 'orders.json')

const STATUSES = ['pending', 'processing', 'shipped', 'delivered', 'cancelled']

const getOrdersFromFile = async () => {
    try {
        return JSON.parse(await fs.readFile(ordersPath, 'utf8'))
    } catch (err) {
        // missing or empty file = no orders yet
        if (err.code === 'ENOENT' || err instanceof SyntaxError) return []
        throw err
    }
}

const saveOrdersToFile = (orders) => fs.writeFile(ordersPath, JSON.stringify(orders))

class Order {
    // items: [{ product, qty }]  ->  stored as a snapshot { productId, title, price, qty }
    // so later product edits/deletes never change a placed order.
    static async create({ items, customer, shipping, paymentMethod }) {
        const orderItems = items.map(({ product, qty }) => ({
            productId: product.id,
            title: product.title,
            price: Number(product.price),
            qty: Number(qty),
        }))

        const order = {
            id: crypto.randomUUID().slice(0, 8).toUpperCase(),
            date: new Date().toISOString(),
            status: 'pending',
            customer,
            shipping,
            paymentMethod,
            items: orderItems,
            total: orderItems.reduce((sum, i) => sum + i.price * i.qty, 0),
        }

        const orders = await getOrdersFromFile()
        orders.push(order)
        await saveOrdersToFile(orders)
        return order
    }

    // newest first
    static async fetchAll() {
        const orders = await getOrdersFromFile()
        return orders.sort((a, b) => new Date(b.date) - new Date(a.date))
    }

    static async fetchById(id) {
        const orders = await getOrdersFromFile()
        return orders.find((o) => o.id === id)
    }

    static async updateStatus(id, status) {
        if (!STATUSES.includes(status)) return null
        const orders = await getOrdersFromFile()
        const order = orders.find((o) => o.id === id)
        if (!order) return null
        order.status = status
        await saveOrdersToFile(orders)
        return order
    }
}

module.exports = Order
