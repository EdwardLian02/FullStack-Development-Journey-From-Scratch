const express = require('express');
const path = require('path')
const app = express();

const homeRoutes = require('./routes/home')
const bookMarkRoutes = require('./routes/bookmark')
const pageNotFoundRoute = require('./routes/404')

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))

app.use(homeRoutes);
app.use('/book',bookMarkRoutes);
app.use(pageNotFoundRoute)



app.listen(3000, (req, res) => {
    console.log("The server is listening on port http://localhost:3000")
})


