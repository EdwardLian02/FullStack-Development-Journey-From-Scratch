//import section
const express = require('express')
const path = require('path')
const rootDir = require('./util/path')
const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const { getPageNotFoundPage } = require('./controllers/404_controller')

const app = express();

//Middleware section
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))

//setup ejs template engine
app.set('view engine', 'ejs');
app.set('views', './views');

//expose current URL path to every view (used by navigation to highlight the active link)
app.use((req, res, next) => {
    res.locals.currentPath = req.path
    next()
})

app.use('/admin', adminRoutes.routes) //only routes start with "/admin"
app.use( shopRoutes) //only routes start with "/shop"

app.use(getPageNotFoundPage)

app.listen(3000, (req, res) => {
    console.log("Server is hosting at http://localhost:3000")
})








