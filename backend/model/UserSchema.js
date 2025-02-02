const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true, // Removes extra spaces
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true, // Converts to lowercase
    },
    password: {
        type: String,
        required: true,
        minlength: 6, // Minimun length of password
    },
    profileImg: {
        type: String,
    },
    contactNo: {
        type: Number,
        unique: true,
        sparse: true,
        length: 10,
    },
    age: {
        type: Number,
        min: 0,
        max: 90,
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"],  // Restricts values to these options
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

const User = mongoose.model("User", UserSchema);
module.exports = User;