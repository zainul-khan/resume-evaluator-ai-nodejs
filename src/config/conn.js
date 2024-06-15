const mongoose = require("mongoose");

const databaseUrl = "mongodb://localhost:27017/resume-evaluator-ai";

const connectDb = async () => {

    try {
        
        await mongoose.connect(databaseUrl);

    } catch (error) {
        
        console.log("errorindbconnetion=>", error);
    }
    
}

module.exports = connectDb;