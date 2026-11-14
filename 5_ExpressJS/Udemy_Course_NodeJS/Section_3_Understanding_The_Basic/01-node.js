const http = require('http')

const route = require('./routes')


const server = http.createServer(route.handlar)

server.listen(3000, (req, res) => {

    console.log("Server is hosting at http://localhost:3000")
})



