require("dotenv").config();
const express = require("express");
const connectDB = require("./model/connectDB");

const userRoutes = require("./controller/userRoutes");
const taskRoutes = require("./controller/taskRoutes");

const app = express();

app.use(express.json()); // Middleware to parse JSON

connectDB(); // Connect to MongoDB

app.get("/", (req, res) => {
    res.send("API call");
});

// Use routes
app.use("/user-api", userRoutes); 
app.use("/task-api", taskRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}/`);
});
