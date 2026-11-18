const express = require('express')
const path = require('path')
const rootDir = require('../util/path');
const { products } = require('../routes/admin');


const router = express.Router();

router.get('/', (req,res) => {
     res.render('shop', {products: products})
});


module.exports = router;