import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./models/userModel.js";
import Post from "./models/postModel.js";
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
        avatar: "/avatar/avatar_mess2.svg",
        bio: "UI/UX Designer from Figma world",
      },
      {
        username: "nikiita_artist",
        fullName: "nikiita",
        email: "nikita@example.com",
        password: hashedEmailPassword,
        avatar: "/avatar/avatar_mess1.svg",
        bio: "Exploring the world one pixel at a time",
      },
      {
        username: "ICHgRAM_official",
        fullName: "itcareerhub",
        email: "ICHgRAM@example.com",
        password: hashedEmailPassword,
        avatar: "/avatar/ICH.svg",
        bio: "Exploring the world one pixel at a time",
      },
      {
        username: "coach.tonia",
        fullName: "tonia",
        email: "tonia@example.com",
        password: hashedEmailPassword,
        avatar: "/avatar/avatar4.svg",
        bio: "Exploring the world one pixel at a time",
      },
      {
        username: "fsssociety",
        fullName: "fsssociety",
        email: "fsssociety@example.com",
        password: hashedEmailPassword,
        avatar: "/avatar/avatar5.svg",
        bio: "Exploring the world one pixel at a time",
      },
    ]);

    console.log("✅ Users created");

    // 2. Создаем посты для  пользователей
    await Post.insertMany([
      {
        author: users[0]._id,
        image: "/posts/Post mainOt.svg",
        caption: "𝘐𝘵’𝘴 𝒈𝒐𝒍𝒅𝒆𝒏, 𝘗𝘰𝘯𝘺𝘣𝘰𝘺!",
      },
      {
        /*
        author: users[1]._id,
        image: "/posts/avatar_mess1.svg",
        caption: "What a beautiful morning!",
      */
      },
      {
        author: users[2]._id,
        image: "/posts/ICH.svg",
        caption:
          "Потрясающие новости пришли к нам из Черногории! Проект по поддержке бездомных животных TailBook, в разработке которого участвуют сразу 9 наших стажёров, будет представлен на Web Summit 2024 в Португалии🔥 Мы поздравляем наших студентов, приглашаем вас на Web Summit и предлагаем стать частью огромного сообщества крутых специалистов, помогающих развивать и очищать нашу планету. Занимайте место на бесплатной консультации по ссылке в шапке профиля и давайте вместе делать мир лучше! 🌍",
      },
      {
        /*
        author: users[3]._id,
        image: "/posts/avatar4.svg",
        caption: "What a beautiful morning!",
      },
      {
        author: users[4]._id,
        image: "/posts/avatar5.svg",
        caption: "What a beautiful morning!",
      */
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
