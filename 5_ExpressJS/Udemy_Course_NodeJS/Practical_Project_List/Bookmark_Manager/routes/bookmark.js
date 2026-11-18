const express = require('express');
const path = require('path')
const rootDir = require('../util/path')

const app = express.Router()

app.get('/add-bookmark', (req, res) => {
    res.sendFile(path.join(rootDir, 'views', 'add-bookmark.html'))
})

app.post('/add-bookmark', (req,res) => {
    console.log(req.body);
    res.redirect('/');
})


module.exports = app;