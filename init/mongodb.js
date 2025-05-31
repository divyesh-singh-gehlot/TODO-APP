const mongoose = require("mongoose")

const connectDb = async () =>{
    try {
        await mongoose.connect(process.env.CONNECTION_URL);
        console.log("MongoDB connected Successfully!")
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
};

module.exports = connectDb;