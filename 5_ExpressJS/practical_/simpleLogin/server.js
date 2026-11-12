const express = require('express');
const app = express();
const port = 3000;

app.use(express.json())
app.use(express.static('public'))


const USERNAME = "ed";
const PASSWORD = "123";

function validateLogin(username, password){
    return username === USERNAME && password === PASSWORD
}
function validateUser(req, res, next){
    const {username, password} = req.body;

    if( username === USERNAME && password === PASSWORD){
        console.log("User is valid")
        next()
    }
    else {
        return res.status(404).send("User not found")
    }
}
app.post("/login", validateUser, (req, res) =>{

  res.send(`Welcome ${req.body.username}`);
})

app.listen(port, () => {
    console.log("The server is at http://localhost:3000")
})