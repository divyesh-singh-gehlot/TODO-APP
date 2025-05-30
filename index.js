const express = require("express")
const mongoose = require("mongoose")

const connectionUrl = "mongodb://127.0.0.1:27017/todoDb"

mongoose
    .connect(connectionUrl)
    .then(() => console.log("TodoDb Connected Successfully!"))
    .catch((error) => console.log(error.message))

const PORT = 5000;

//Initialize app
const app = express();

//Set view engine
app.set("view engine", "ejs");

app.get("/", (req, res)=>{
    try {
        res.render("index")
    } catch (error) {
        res.status(500).send(error.message)
    }
});

app.get("/add-task", (req, res)=>{
    try {
        res.render("addTodo")
    } catch (error) {
        res.status(400).send(error.message)
    }
});

app.get("/update-task", (req, res)=>{
    try {
        res.render("updateTodo")
    } catch (error) {
        res.status(400).send(error.message)
    }
});

app.get("/delete-task", (req, res)=>{
    try {
        res.render("deleteTodo")
    } catch (error) {
        res.status(400).send(error.message)
    }
});

// Listen the server
app.listen(PORT, () => {
    console.log("Server is running on Port: " + PORT)
})