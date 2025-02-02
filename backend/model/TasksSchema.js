const mongoose = require("mongoose");

const TasksSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Referencing the User model
        required: true,
    },
    task: {
        type: String,
        required: true,
        // lowercase: true,
        trim: true,
    },
    date: {
        type: String,
        required: true,
        trim: true,
    },
    time: {
        type: String, // Changed from Date to String for time-only values
        required: true,
        trime: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Task = mongoose.model("Task", TasksSchema);
module.exports = Task;
