const express = require('express');
const path = require('path')
const rootDir = require('../util/path')

const app = express.Router()

app.get('/', (req, res) => {
    res.sendFile(path.join(rootDir, 'views', 'home.html'))
})


module.exports = app;