const express = require('express');
const path = require('path')
const rootDir = require('../util/path')

const router = express.Router();


router.get('/add-product', (req, res) => {
    console.log("Add product page")
    console.log(rootDir)
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'))
})

router.post('/product', (req,res) => {
    console.log("Product api")
    console.log(req.body)
    res.redirect('/')

})


module.exports = router;