import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/userModel.js";
import Post from "./models/postModel.js";
import connectDB from "./config/db.js";

dotenv.config();

const seed = async () => {
  try {
    await connectDB();

    // Очищаем базу перед заполнением
    await User.deleteMany();
    await Post.deleteMany();

    // 1. Создаем "ботов" из Figma
    const sasha = await User.create({
      username: "sashaa_designer",
      fullName: "sashaa",
      email: "sashaa@example.com",
      password: "password123",
      avatar: "/avatar/avatar_mess2.svg",
      bio: "UI/UX Designer from Figma world",
    });

    const nikita = await User.create({
      username: "nikiita_artist",
      fullName: "nikiita",
      email: "nikita@example.com",
      password: "password123",
      avatar: "/avatar/avatar_mess1.svg",
      bio: "Exploring the world one pixel at a time",
    });

    const ichgram = await User.create({
      username: "ICHgRAM_official",
      fullName: "itcareerhub",
      email: "ICHgRAM@example.com",
      password: "password123",
      avatar: "/avatar/ICH.svg",
      bio: "Exploring the world one pixel at a time",
    });

    const tonia = await User.create({
      username: "coach.tonia",
      fullName: "tonia",
      email: "tonia@example.com",
      password: "password123",
      avatar: "/avatar/avatar4.svg",
      bio: "Exploring the world one pixel at a time",
    });

    const fsssociety = await User.create({
      username: "fsssociety",
      fullName: "fsssociety",
      email: "fsssociety@example.com",
      password: "password123",
      avatar: "/avatar/avatar5.svg",
      bio: "Exploring the world one pixel at a time",
    });

    console.log("✅ Users created");

    // 2. Создаем посты для  пользователей
    await Post.insertMany([
      {
        author: sasha._id,
        image: "/posts/Post mainOt.svg",
        caption: "𝘐𝘵’𝘴 𝒈𝒐𝒍𝒅𝒆𝒏, 𝘗𝘰𝘯𝘺𝘣𝘰𝘺!",
      },
      {
        author: sasha._id,
        image: "/posts/Post mainOt.svg",
        caption: "𝘐𝘵’𝘴 𝒈𝒐𝒍𝒅𝒆𝒏, 𝘗𝘰𝘯𝘺𝘣𝘰𝘺!",
      },
      {
        author: sasha._id,
        image: "/posts/Post mainOt.svg",
        caption: "𝘐𝘵’𝘴 𝒈𝒐𝒍𝒅𝒆𝒏, 𝘗𝘰𝘯𝘺𝘣𝘰𝘺!",
      },
      {
        author: sasha._id,
        image: "/posts/Post mainOt.svg",
        caption: "𝘐𝘵’𝘴 𝒈𝒐𝒍𝒅𝒆𝒏, 𝘗𝘰𝘯𝘺𝘣𝘰𝘺!",
      },

      {
        author: ichgram._id,
        image: "/posts/ICH.svg",
        caption:
          "Потрясающие новости пришли к нам из Черногории! Проект по поддержке бездомных животных TailBook, в разработке которого участвуют сразу 9 наших стажёров, будет представлен на Web Summit 2024 в Португалии🔥 Мы поздравляем наших студентов, приглашаем вас на Web Summit и предлагаем стать частью огромного сообщества крутых специалистов, помогающих развивать и очищать нашу планету. Занимайте место на бесплатной консультации по ссылке в шапке профиля и давайте вместе делать мир лучше! 🌍",
      },
    ]);

    console.log("Posts created");
    console.log("Database successfully seeded!");
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
};

seed();
