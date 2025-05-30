const express = require("express")

const PORT = 5000;

//Initialize app
const app = express();

//Set view engine
app.set("view engine", "ejs");



// Listen the server
app.listen(PORT, ()=>{
    console.log("Server is running on Port: "+PORT)
})