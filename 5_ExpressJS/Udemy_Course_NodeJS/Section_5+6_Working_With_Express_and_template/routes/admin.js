const express = require('express');
const path = require('path')
const rootDir = require('../util/path')

const router = express.Router();

const products = [];


router.get('/add-product', (req, res) => {
    console.log("Add product page")
    console.log(rootDir)
    res.render('add-product', {pageTitle: 'Add Product'})
})

router.post('/product', (req,res) => {
    console.log("Product api")
    console.log(req.body)

    products.push({
        title: req.body.title,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        description: req.body.description
    })

    res.redirect('/')
})


// exports.routes = router;
// exports.products = products;


module.exports = {
    routes: router, 
    products: products
}