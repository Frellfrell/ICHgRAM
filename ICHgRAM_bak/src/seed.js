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
        avatar: "/public/avatar/avatar_mess2.svg",
        bio: "UI/UX Designer from Figma world",
      },
      {
        username: "nikiita_artist",
        fullName: "nikiita",
        email: "nikita@example.com",
        password: hashedEmailPassword,
        avatar: "/public/avatar/avatar_mess1.svg",
        bio: "Exploring the world one pixel at a time",
      },
      {
        username: "ICHgRAM_official",
        fullName: "itcareerhub",
        email: "ICHgRAM@example.com",
        password: hashedEmailPassword,
        avatar: "/public/avatar/ICH.svg",
        bio: "Exploring the world one pixel at a time",
      },
      {
        username: "coach.tonia",
        fullName: "tonia",
        email: "tonia@example.com",
        password: hashedEmailPassword,
        avatar: "/public/avatar/avatar4.svg",
        bio: "Exploring the world one pixel at a time",
      },
      {
        username: "fsssociety",
        fullName: "fsssociety",
        email: "fsssociety@example.com",
        password: hashedEmailPassword,
        avatar: "/public/avatar/avatar5.svg",
        bio: "Exploring the world one pixel at a time",
      },
    ]);

    console.log("✅ Users created");

    // 2. Создаем посты для  пользователей
    await Post.insertMany([
      {
        author: users[0]._id,
        image: "/posts/post1.png",
        caption: "My new design project! #figma #ichgram",
      },
      {
        author: users[1]._id,
        image: "/posts/post2.png",
        caption: "What a beautiful morning!",
      },
    ]);

    console.log("✅ Posts created");
    console.log("🚀 Database successfully seeded!");
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
};

seedData();
