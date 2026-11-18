const express = require('express')
const path = require('path')
const rootDir = require('../util/path');
const { products } = require('../routes/admin');
const { getAllProductShopPage } = require('../controllers/product_controller');


const router = express.Router();

router.get('/', getAllProductShopPage );


module.exports = router;