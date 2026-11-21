const fs = require('fs/promises');
const path = require('path')
const rootDir = require('../util/path');

const productsFilePath = path.join(rootDir, 'data', 'products.json');

const getProductsFromFile = async () => {
    try {
        const fileContent = await fs.readFile(productsFilePath, 'utf8');
        return JSON.parse(fileContent);
    } catch (err) {
        if (err.code === 'ENOENT') return [];
        throw err;
    }
};

const saveProductsToFile = async (products) => {
    await fs.writeFile(productsFilePath, JSON.stringify(products));
};

module.exports = class Product {
    constructor(title, description, price, imageUrl) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.price = price;
        this.imageUrl = imageUrl;
    }

    async save() {
        const products = await getProductsFromFile();
        products.push(this);
        await saveProductsToFile(products);
    }


    static async editProduct(id, { title, description, price, imageUrl }) {
        const products = await getProductsFromFile();
        const index = products.findIndex((pd) => pd.id === id);
        if (index === -1) return null;

        products[index] = { ...products[index], title, description, price, imageUrl };
        await saveProductsToFile(products);
        return products[index];
    }

    static async deleteProduct(id){
        const products = await getProductsFromFile();
        const updatedProducts = products.filter((pd) => pd.id !== id)

        await saveProductsToFile(updatedProducts);
    }

    static async fetchAll() {
        try {
            return await getProductsFromFile();
        } catch (err) {
            console.log(err);
            return [];
        }
    }

    static async fetchById(id) {
        try {
            const products = await getProductsFromFile();
            return products.find((prd) => prd.id === id);
        } catch (err) {
            console.log(err);
            return;
        }
    }


}