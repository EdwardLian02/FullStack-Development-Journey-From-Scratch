const http = require('http')
const route = require('./routes')

const port = 3000;

const server = http.createServer((req, res) => {
    const method = req.method;
    if (method === "GET") {
        if (req.url === '/') {
            res.write('<html>');
            res.write('<head><title>Enter Your username</title><head>');
            res.write('<body><form action="/username" method="POST"><input type="text" name="username"><button type="submit">Send</button></form></body>');
            res.write('</html>');
            return res.end()
        } else if (req.url === '/users') {
            res.write('<html>')
            res.write('<ul>')
            res.write('<li>User 1</li>')
            res.write('<li>User 2</li>')
            res.write('<li>User 3</li>')
            res.write('</ul>')
            res.write('</html>')
            return res.end()
        }
    } else { //POST METHOD
        if (req.url === '/username') {
            const inputData = [];
            req.on('data', (chunk) => {
                inputData.push(chunk);
                console.log(chunk)
            })

         

            req.on('end', () => {
                const data = Buffer.concat(inputData).toString();
                console.log(data)
                const username = data.split("=")[1]
                res.setHeader('Content-Type', 'application/json')
                res.statusCode = 200;

                return res.end(JSON.stringify({ name: username }))
            })





        }
    }

});

server.listen(port, () => {
    console.log('server is listening at http://localhost:3000')
});





