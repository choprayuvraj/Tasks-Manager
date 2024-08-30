// required modules
const mongoose = require("mongoose");

// content schema
const contentSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    isDone: {
        type: Boolean,
        required: true,
        default: false
    },
});

// contact model
const Content = mongoose.model("Content", contentSchema);

module.exports = Content;
