import mongoose from "mongoose";
const postSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        maxlength: 2000,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true,