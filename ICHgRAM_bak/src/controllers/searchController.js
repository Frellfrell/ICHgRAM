import User from "../models/userModel.js";

// Контроллер для поиска пользователей
export const searchUsers = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: "Поисковый запрос не передан" });
    }

     const users = await User.find({
      $or: [
        { username: { $regex: query, $options: "i" } },
        { fullName: { $regex: query, $options: "i" } },
      ],
    }).select("username fullName");

    