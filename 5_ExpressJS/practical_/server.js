const express = require('express') // kinda import express


//setup express web application
//represent the entire express application
// create express webserver
const app = express();


//Middleware 
//use() method can be reused and run on every single one of http method
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url} ${Date.now()}`)

    //
    next();
})

//Middleware with path specific
// app.use('/json', (req,res, next) => {
//     console.log("Enjoy your JSON")

//     next()
// })

//middleware func
function checkLogin(req, res, next){
    const isLoggedIn = false;

    if(!isLoggedIn){
        return res.status(401).send('Please Log in first')
    }

    next()
}



// listen a port to run server
app.listen(3000, ()=> {
    console.log("the server is running on http://localhost:3000")
})

//Trigger get request
app.get('/', checkLogin,  (req, res) => {
    res.send('Hello world')
});

app.get('/json',checkLogin,  (req, res) => {
    res.json({ 
        name: 'YeXing', 
        message: 'Hello there, nice to meet you'
    })
});

// app.get('/', (req, res) => {
//     res.send("<h1>Hi there! Welcome from the world</h1>")
// })

// app.use((req,res) =>res.status(404).send('Oops! 404 Page not Found'))





// app.get('/about', (req, res) => {
//     res.send('Hello about page')
// })

