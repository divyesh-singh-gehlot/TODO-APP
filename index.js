const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const moment = require("moment")

const connectionUrl = "mongodb://127.0.0.1:27017/todoDb"

mongoose
    .connect(connectionUrl)
    .then(() => console.log("TodoDb Connected Successfully!"))
    .catch((error) => console.log(error.message))

const PORT = 5000;

const todoSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
}, { timestamps: true })

const Todo = mongoose.model("todo", todoSchema)

//Initialize app
const app = express();

//Set view engine
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}))


//Setting up routes
app.get("/", async (req, res) => {
    try {

        const tasks = await Todo.find({})

        res.locals.moment = moment;

        res.render("index", { title: "Home", tasks })
    } catch (error) {
        res.status(500).send(error.message)
    }
});

app.get("/add-task", (req, res) => {
    try {
        res.render("addTodo", { title: "Add" })
    } catch (error) {
        res.status(400).send(error.message)
    }
});

app.get("/update-task", (req, res) => {
    try {
        res.render("updateTodo", { title: "Update" })
    } catch (error) {
        res.status(400).send(error.message)
    }
});

app.get("/delete-task", (req, res) => {
    try {
        res.render("deleteTodo", { title: "Delete" })
    } catch (error) {
        res.status(400).send(error.message)
    }
});

app.post("/add-task", async (req, res, next)=> {
    try {
        const {title, description} = req.body;

        if(!title && !description){
            res.status(400).send({message:"Both the Fields are Required"});
        }
        if(!title){
            res.status(400).send({message:"Title is Required"});
        }
        if(!description){
            res.status(400).send({message:"Description is Required"});
        }
        
        const newTodo = new Todo({title, description});
        await newTodo.save();

        console.log("Title and description saved to DB.")

        res.redirect("/")
    } catch (error) {
        res.status(400).send(error.message);
    }
});

app.post("/update-task", async (req, res) => {
    try {
        const {id} = req.query;
        const {title, description} = req.body;

        await Todo.findOneAndUpdate({id}, {title, description})
        console.log("Data Updated Successfully!!!")

        res.redirect("/")
    } catch (error) {
        res.status(400).send(error.message)
    }
});

// Listen the server
app.listen(PORT, () => {
    console.log("Server is running on Port: " + PORT)
})