
const fs = require('fs');
const { request } = require('http');

const requestHandlar = (req, res) => {
    const method = req.method;

    if (req.url === '/') {
        res.write('<html>');
        res.write('<head><title>Enter Message</title><head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
        res.write('</html>');
        return res.end();
    }

    if (req.url === '/message' && req.method === method) {
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk)
            body.push(chunk)
        })
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split("=")[1];
            fs.writeFileSync('message', message);
        })
        res.setHeader('Location', '/')
        res.statusCode = 302;
        return res.end()
    }
}

module.exports = {
    handlar: requestHandlar
}


