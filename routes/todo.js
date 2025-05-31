const express = require("express")
const router = express.Router()
const todoControllers = require("../controller/todoController")


router.get("/", todoControllers.homeTodoPage);

router.get("/add-task", todoControllers.addTodoForm);

router.get("/update-task", todoControllers.updateTodoForm);

router.get("/delete-task", todoControllers.deleteTodoPage);

router.post("/add-task", todoControllers.addTodo);

module.exports = router;