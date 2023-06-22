const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "username is required!"],
        unique: [true, "Duplicate name not allowed!"]
    },
    name: String,
    password: {
        type: String,
        required: [true, "passsword is required!"],
    },
});

mongoose.model("User", userSchema, "users");