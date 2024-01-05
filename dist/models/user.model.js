"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    phoneNo: {
        type: Number,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    }
}, { timestamps: true });
const User = mongoose.model("User", userSchema);
module.exports = User;
