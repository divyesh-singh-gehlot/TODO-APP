const express = require("express")
const bodyParser = require("body-parser")
const connectDb = require("./init/mongodb")
const todoRoute = require("./routes/todo")
const dotenv = require("dotenv")

//Enviroment Variables
dotenv.config();

//Initialize app
const app = express();

//Connect Database
connectDb();

//Set view engine
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}))
app.use("/", todoRoute);

module.exports = app;