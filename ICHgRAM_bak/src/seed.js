import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./src/models/userModel.js";
import Post from "./src/models/postModel.js";
import connectDB from "./src/config/db.js";

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    // Очищаем базу перед заполнением
    await User.deleteMany();
    await Post.deleteMany();

    const salt = await bcrypt.genSalt(10);
    const hashedEmailPassword = await bcrypt.hash("password123", salt);