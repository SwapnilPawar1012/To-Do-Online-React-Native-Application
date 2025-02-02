const express = require("express");
const jwt = require("jsonwebtoken");
const Task = require("../model/TasksSchema");

const taskRouter = express.Router();

// Middleware for token verification
// const VerifyToken = async (req, res, next) => {
//     const token = req.header("Authorization");
//     if (!token) {
//         return res.status(401).json({ message: "Access Denied: No Token Provided" });
//     }
//     try {
//         const verified = jwt.verify(token.split(" ")[1], process.env.SECRET_KEY);
//         req.user = verified;  // Attach decoded user information to request object
//         next();
//     } catch (error) {
//         return res.status(401).json({ message: "Invalid Token" });
//     }
// };

// Fetch tasks
taskRouter.post("/tasks", async (req, res) => {
    try {
        const { userId } = req.body;  // Use userId from decoded JWT
        if (!userId) {
            return res.status(400).json({ message: "User is not authenticated, Please Login again and try" });
        }

        const tasks = await Task.find({ userId });
        res.status(200).json(tasks);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching tasks", error: error.message });
    }
});

// Add task
taskRouter.post("/add-task", async (req, res) => {
    try {
        const { userId, task, date, time } = req.body;

        if (!userId) {
            return res.status(400).json({ message: "User is not authenticated, Please Login again and try" });
        }
        if (!task || !date || !time) {
            return res.status(400).json({ message: "Task, Date, and Time are required" });
        }

        // Check if the task already exists
        const taskExists = await Task.findOne({ task, userId });
        if (taskExists) {
            return res.status(400).json({ message: "Task already exists for this user" });
        }

        const newTask = new Task({ task, date, time, userId });
        const savedTask = await newTask.save();

        return res.status(200).json({ message: "Task added successfully", task: savedTask });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

// Update task
taskRouter.put("/update-task", async (req, res) => {
    try {
        console.log("/update-task: ", req.body);
        const { userId, taskId, task, date, time } = req.body;

        if (!userId) {
            return res.status(400).json({ message: "User is not authenticated, Please Login again and try" });
        }

        if (!taskId || !task || !date || !time) {
            return res.status(400).json({ message: "Task ID, Task, Date, and Time are required" });
        }

        // Find the existing task by taskId and ensure it's the user's task
        const existingTask = await Task.findOne({ _id: taskId, userId });
        if (!existingTask) {
            return res.status(404).json({ message: "Task not found or you're not authorized to update this task" });
        }

        // Update the task fields
        existingTask.task = task;
        existingTask.date = date;
        existingTask.time = time;

        // Save the updated task
        const updatedTask = await existingTask.save();

        return res.status(200).json({
            success: true,
            message: "Task updated successfully",
            task: updatedTask,
        });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

// Delete task
taskRouter.delete("/delete-task", async (req, res) => {
    try {
        console.log("/delete-task: ", req.body);
        const { userId, taskId } = req.body;

        if (!userId) {
            return res.status(400).json({ message: "User is not authenticated, Please Login again and try" });
        }
        if (!taskId) {
            return res.status(400).json({ error: "Task ID is required" });
        }

        const deletedTask = await Task.findOneAndDelete({ _id: taskId, userId });
        if (!deletedTask) {
            return res.status(404).json({ error: "Task not found or you're not authorized to delete this task" });
        }

        return res.status(200).json({ message: "Task deleted successfully", deletedTask });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

module.exports = taskRouter;
