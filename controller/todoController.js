const Todo = require("../models/Todo")
const moment = require("moment")

const homeTodoPage = async (req, res) => {
    try {

        const tasks = await Todo.find({}).sort({updatedAt: -1})

        res.locals.moment = moment;

        res.render("index", { title: "Home", tasks })
    } catch (error) {
        res.status(500).send(error.message)
    }
};

const addTodoForm = (req, res) => {
    try {
        res.render("addTodo", { title: "Add" })
    } catch (error) {
        res.status(400).send(error.message)
    }
};

const updateTodoForm = async (req, res) => {
    try {
        const {id} = req.query;
        const updateTask = await Todo.findById(id);
        console.log(updateTask)

        res.render("updateTodo", { title: "Update" , updateTask})
    } catch (error) {
        res.status(400).send(error.message)
    }
};

const deleteTodoPage = (req, res) => {
    try {
        const {id} = req.query;
        res.render("deleteTodo", { title: "Delete" , id })
    } catch (error) {
        res.status(400).send(error.message)
    }
};

const addTodo = async (req, res, next)=> {
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
};

const updateTodo = async (req, res, next)=> {
    try {
        const {id} = req.params;
        const {title, description} = req.body;
        
        const todo = await Todo.findById(id);
         if(!todo){
            res.status(400).send("No Todo Found")
         }

         todo.title = title;
         todo.description = description;

         await todo.save()
        
        console.log("Title and description updated in DB.")

        res.redirect("/")
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const deleteTodo = async (req, res, next)=> {
    try {
        const {id} = req.params;
        
        await Todo.findByIdAndDelete(id);
        
        console.log("Todo Deleted in DB.")

        res.redirect("/")
    } catch (error) {
        res.status(400).send(error.message);
    }
};

module.exports = {
    homeTodoPage,
    addTodoForm,
    updateTodoForm,
    deleteTodoPage,
    addTodo,
    updateTodo,
    deleteTodo
}