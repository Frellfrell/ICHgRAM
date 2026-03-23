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

    // 1. Создаем "ботов" из Figma
    const users = await User.insertMany([
      {
        username: "sashaa_designer",
        fullName: "sashaa",
        email: "sashaa@example.com",
        password: hashedEmailPassword,
        avatar: "/avatars/avatar1.jpg", // Ссылка на твою папку public/avatar
        bio: "UI/UX Designer from Figma world"
      },
      {
        username: "nikiita_artist",
        fullName: "nikiita",
        email: "nikita@example.com",
        password: hashedEmailPassword,
        avatar: "/avatars/avatar2.jpg",
        bio: "Exploring the world one pixel at a time"
      }
      {
        username: "ICHgRAM_official",
        fullName: "itcareerhub",
        email: "ICHgRAM@example.com",
        password: hashedEmailPassword,
        avatar: "/avatars/avatar2.jpg",
        bio: "Exploring the world one pixel at a time"
      }
      {
        username: "coach.tonia",
        fullName: "tonia",
        email: "tonia@example.com",
        password: hashedEmailPassword,
        avatar: "/avatars/avatar2.jpg",
        bio: "Exploring the world one pixel at a time"
      }
      {
        username: "fsssociety",
        fullName: "fsssociety",
        email: "fsssociety@example.com",
        password: hashedEmailPassword,
        avatar: "/avatars/avatar2.jpg",
        bio: "Exploring the world one pixel at a time"
      }
    ]);

    console.log("✅ Users created");