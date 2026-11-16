const http = require('http')


const server = http.createServer()

server.listen(3000, (req, res) => {
    console.log("Server is hosting at http://localhost:3000")
})



