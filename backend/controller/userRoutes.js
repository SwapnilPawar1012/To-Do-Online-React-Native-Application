const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const User = require("../model/UserSchema")

const userRouter = express.Router()

userRouter.get("/get-users", async (req, res) => {
    try {
        const users = await User.find();

        if (users.length === 0) {
            return res.status(404).json({ error: "No users found" })
        }

        return res.status(200).json({ users })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})

// Signup Route
userRouter.post("/signup", async (req, res) => {
    try {
        console.log("req.body: ", req.body);
        // Check if request body exists
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: "Request body is missing" });
        }

        const { name, email, password, profileImg, contactNo, age, gender } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ error: "Required fields are missing" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already in use" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            profileImg,
            contactNo,
            age,
            gender,
        });

        // Save to database
        const savedUser = await newUser.save();

        // Generate JWT token
        const token = jwt.sign({ userId: savedUser._id }, process.env.SECRET_KEY, { expiresIn: "1h" });

        return res.status(200).json({ message: "User added successfully!", user: savedUser, token });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// Login Route
userRouter.post("/login", async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: "Request body is missing" });
        }

        const { email, password } = req.body;

        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({ error: "Required fields are missing" });
        }

        // Find user by email
        const userExists = await User.findOne({ email });
        if (!userExists) {
            return res.status(400).json({ error: "Invalid credentials. Please try again." });
        }

        // Compare hashed password
        const isMatch = await bcrypt.compare(password, userExists.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials. Please try again." });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: userExists._id }, process.env.SECRET_KEY, { expiresIn: "1h" });

        return res.status(200).json({ message: "Login successful!", user: userExists, token });
    } catch (error) {
        return res.status(500).json({ error: "Login failed. Please try again later." });
    }
});

userRouter.delete("/remove-user", async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ error: "Request body is missing" })
        }

        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ error: "Email is required" })
        }

        const deleteUser = await User.findOneAndDelete({ email });
        if (!deleteUser) {
            return res.status(404).json({ error: "User not found!" })
        }

        return res.status(200).json({ message: "User deleted successfully", user: deleteUser })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})

module.exports = userRouter;