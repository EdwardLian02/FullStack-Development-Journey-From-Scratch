const fs = require('fs/promises')
const path = require('path')
const rootDir = require('../util/path')
const Product = require('./product_model')

const cartPath = path.join(rootDir, 'data', 'cart.json')

const getCartFromFile = async () => {
    try {
        // JSON.parse throws on an empty/invalid file, so the fallback lives in catch
        return JSON.parse(await fs.readFile(cartPath, 'utf8'))
    } catch (err) {
        return { products: [], total: 0 }
    }
}

const saveCartToFile = (cart) => fs.writeFile(cartPath, JSON.stringify(cart))

class Cart {

    // Returns the raw stored shape: { products: [{ id, qty }], total }
    static async getCart(){
        return getCartFromFile();
    }

    // Returns [{ product, qty }] with full product data joined in.
    // Entries whose product was deleted since being added are dropped.
    static async getItems() {
        const cart = await getCartFromFile()
        const lines = await Promise.all(
            cart.products.map(async ({ id, qty }) => {
                const product = await Product.fetchById(id)
                return product ? { product, qty: Number(qty) } : null
            })
        )
        return lines.filter(Boolean)
    }

    static async addProduct(id, parsedQty) {
        const cart = await getCartFromFile()

        // always store qty as a positive whole number (form fields arrive as strings)
        const addQty = Math.max(1, parseInt(parsedQty, 10) || 1)

        const isInCart = cart.products.some((pd) => pd.id === id)
        const products = isInCart
            ? cart.products.map((pd) => pd.id === id ? { ...pd, qty: Number(pd.qty) + addQty } : pd)
            : [...cart.products, { id, qty: addQty }]

        await saveCartToFile({ ...cart, products })
    }

    static async clear() {
        await saveCartToFile({ products: [], total: 0 })
    }

    static async removeFromCart(id){
        const cart = await getCartFromFile();

        const isInCart = cart.products.some((pd) => pd.id === id);
        if(!isInCart){
            return;
        }

        const updatedProducts = cart.products.filter((pd) => pd.id !== id)
        await saveCartToFile({...cart, products: updatedProducts});    
    }
}

module.exports = Cart