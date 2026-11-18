const express = require('express')
const path = require('path')
const rootDir = require('../util/path')

const router = express.Router();

router.get('/', (req,res) => {
    console.log(rootDir)
     res.sendFile(path.join(rootDir, 'views', 'shop.html'))
});


module.exports = router;