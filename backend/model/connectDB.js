require("dotenv").config();
const mongoose = require("mongoose");

const mongoose_uri = process.env.MONGO_URI;

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(mongoose_uri);
        console.log("MongoDB Connected!");
    } catch (error) {
        console.error("Error Connecting MongoDB: ", error);
        process.exit(1);  // Exit the process if DB connection fails
    }
};

// Export the connection function
module.exports = connectDB;
