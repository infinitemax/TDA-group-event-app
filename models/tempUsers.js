// a temp userSchema while we work on the auth stuff

const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    token: String
})

module.exports.User = mongoose.model("User", userSchema);
