const express = require("express")
const router = express.Router()
const todoControllers = require("../controller/todoController")


router.get("/", todoControllers.homeTodoPage);

router.get("/add-task", todoControllers.addTodoForm);

router.get("/update-task", todoControllers.updateTodoForm);

router.get("/delete-task", todoControllers.deleteTodoPage);

router.post("/add-task", todoControllers.addTodo);

router.post("/update-task/:id", todoControllers.updateTodo);

router.get("/confirm-delete/:id", todoControllers.deleteTodo);


module.exports = router;