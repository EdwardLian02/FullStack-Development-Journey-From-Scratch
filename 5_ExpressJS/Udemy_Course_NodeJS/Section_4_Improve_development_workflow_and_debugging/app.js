const http = require('http')

const express = require('express')

const app = express();

const server = http.createServer(app)

server.listen(3000, (req, res) => {
    console.log("Starting...")
    console.log("Server is hosting at http://localhost:3000")
})



