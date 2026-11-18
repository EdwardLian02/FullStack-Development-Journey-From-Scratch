const Product = require('../models/product_model')
const rootDir = require('../util/path')

const getAddProductPage = (req, res) => {
    res.render('add-product', {pageTitle: 'Add Product'})
}


const addProduct = async (req,res,next) => {
    const product = new Product(req.body.title,req.body.description, req.body.price, req.body.imageUrl)
    try {
        await product.save()
        res.redirect('/')
    } catch (err) {
        next(err)
    }
}

const getAllProductShopPage = async (req,res) => {
    const products = await Product.fetchAll();
     res.render('shop', {products: products, pageTitle: 'My Shop'})
}

exports.getAddProductPage = getAddProductPage;
exports.addProduct = addProduct;
exports.getAllProductShopPage = getAllProductShopPage;