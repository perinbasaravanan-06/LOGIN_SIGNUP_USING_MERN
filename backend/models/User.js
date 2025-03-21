const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: String,
    email: { type: String, required: true, unique: true },
    password: String,
    googleId: String, // For Google Authentication
});

module.exports = mongoose.model("User", UserSchema);
