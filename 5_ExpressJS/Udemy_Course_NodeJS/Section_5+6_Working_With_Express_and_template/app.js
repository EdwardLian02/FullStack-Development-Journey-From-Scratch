//import section
const express = require('express')
const path = require('path')
const rootDir = require('./util/path')
const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

const app = express();

//Middleware section
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))

//setup ejs pug
app.set('view engine', 'pug');
app.set('views', './views');

//expose current URL path to every view (used by navigation to highlight the active link)
app.use((req, res, next) => {
    res.locals.currentPath = req.path
    next()
})

app.use('/admin', adminRoutes.routes) //only routes start with "/admin"
app.use( shopRoutes) //only routes start with "/shop"

app.use((req,res,next) => {
    console.log(rootDir)
    res.status(404).render('404', {pageTitle: 'Page Not Found'})
})

app.listen(3000, (req, res) => {
    console.log("Server is hosting at http://localhost:3000")
})



// //First middleware
// app.use((req, res, next) => {
//     if(req.url === '/' && req.method === "GET"){
//         console.log("This is in middleware")
//     }else {
//         res.send("<h1>Hi slash</h1>")
//     }
//     next();
// })

//Second middleware
// app.use((req, res, next) => {
//     console.log("This is another middleware")
//     // res.send("<h1>Hello</h1>")
//     res.json({name: "Hi"})
// })

// app.use('/', (req,res, next) => {
//     console.log("This always run");
//     next();
// })

// app.use('/add-product', (req,res, next) => {
//     console.log("This is /add-product");
//     res.send(`<h1>URL: add-product</h1>`)

// })
// app.use('/', (req,res, next) => {
//     console.log("This is /");
//     res.send(`<h1>URL: ${req.url}</h1>`)
// })







