const Product = require('../models/product_model');

const { products } = require('../routes/admin');
const rootDir = require('../util/path')

const getIndexPage = (req, res) =>{
    res.render('shop/index');
}
 
const getAddProductPage = (req, res) => {
    res.render('admin/add-product', {pageTitle: 'Add Product'})
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
     res.render('shop/product-list', {products: products, pageTitle: 'My Shop'})
}
const getAllProductAdminPage = async (req,res) => {
      const products = await Product.fetchAll();
     res.render('admin/products', {products: products, pageTitle: "Admin Products Page"})
}

const getEditProductPage = async (req, res, next) => {
    const product = await Product.fetchById(req.params.productId);

    // unknown id -> fall through to the 404 middleware
    if (!product) return next();

    res.render('admin/edit-product', {product: product, pageTitle: 'Edit Product'})
}

const editProduct = async (req, res, next) => {
    // the form sends the id as a hidden field named "productId"
    const { productId, title, description, price, imageUrl } = req.body;

    try {
        const updated = await Product.editProduct(productId, { title, description, price, imageUrl });

        // unknown id > fall through to the 404 middleware
        if (!updated) return next();

        res.redirect('/admin/products')
    } catch (err) {
        next(err)
    }
}

const deleteProduct = async (req, res, next) => {
    try {
        await Product.deleteProduct(req.body.productId)
        res.redirect('/admin/products')
    } catch (err) {
        next(err)
    }
}

const getProductDetail = async (req, res, next) => {
    const product = await Product.fetchById(req.params.productId)

    // unknown id > fall through to the 404 middleware
    if (!product) return next()

    res.render('shop/product-detail', {product: product, pageTitle: product.title})
}



exports.getAddProductPage = getAddProductPage;
exports.addProduct = addProduct;
exports.getAllProductShopPage = getAllProductShopPage;
exports.getIndexPage = getIndexPage;
exports.getEditProductPage = getEditProductPage;
exports.editProduct = editProduct;
exports.deleteProduct = deleteProduct;
exports.getProductDetail = getProductDetail;
exports.getAllProductAdminPage = getAllProductAdminPage;