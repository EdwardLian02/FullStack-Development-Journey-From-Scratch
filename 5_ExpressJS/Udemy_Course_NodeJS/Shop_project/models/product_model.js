const fs = require('fs/promises');
const path = require('path')
const rootDir = require('../util/path');

module.exports = class Product {
    constructor(title, description, price, imageUrl) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.imageUrl = imageUrl;
    }

    async save() {
        //get the file path
        const p = path.join(rootDir, 'data', 'products.json')

        //read-file
        const fileContent = await fs.readFile(p, 'utf8');
        const products = JSON.parse(fileContent);
        products.push(this);

        //re-write the file
        await fs.writeFile(p, JSON.stringify(products));
    }

    static async fetchAll() {
        const p = path.join(rootDir, 'data', 'products.json')

        try {
            const fileContent = await fs.readFile(p, 'utf8');
            return JSON.parse(fileContent);
        } catch (err) {
            console.log(err);
            return [];
        }
    }
}