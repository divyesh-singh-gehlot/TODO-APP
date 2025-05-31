const app = require("./app")

const PORT = process.env.PORT || 8000;

// Listen the server
app.listen(PORT, () => {
    console.log("Server is running on Port: " + PORT)
})