const fs = require('fs/promises')
const path = require('path')
const rootDir = require('../util/path')

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

    static async addProduct(id, parsedQty) {
        const cart = await getCartFromFile()

      
        const isInCart = cart.products.some((pd) => pd.id === id)
        const products = isInCart
            ? cart.products.map((pd) => pd.id === id ? { ...pd, qty: parsedQty? Number(pd.qty) + Number(parsedQty) : pd.qty + 1 } : pd)
            : [...cart.products, { id, qty: parsedQty? parsedQty: 1 }]

        await saveCartToFile({ ...cart, products })
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