const mongoose = require("mongoose");
const {USER_STATUS} = require("../utils/constant.utils.js");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 1,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        minlength: 5,
        maxlength: 100,
        required: true
    },
    resetToken: {
        type: String,
    },
    profile: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        minlength: 10,
        maxlength: 13,
        required: false
    },
    status: {
        type: String,
        enum: [USER_STATUS.ACTIVE, USER_STATUS.BLOCKED, USER_STATUS.DELETED], // Use enum to restrict the values
        required: true,
    },
    address: {
        type: String,
        required: true
    },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;
