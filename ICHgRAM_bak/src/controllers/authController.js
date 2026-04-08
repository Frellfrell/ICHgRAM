import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import { generateToken } from "../config/jwt.js";

export const register = async (req, res) => {
  try {
    const { username, fullName, email, password } = req.body;

    // 1. Валидация

    if (!username || !fullName || !email || !password) {
      return res.status(400).json({ message: "Заполните все поля" });
    }

    if (password.length < 6) {
      return res

        .status(400)

        .json({ message: "Пароль должен быть не менее 6 символов" });
    }
    // 2. Проверка уникальности

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(400).json({ message: "Пользователь уже существует" });
    }

    // 4. Создание пользователя

    const user = await User.create({
      username,
      fullName,
      email: email.trim().toLowerCase(),
      password,
    });

    // 5. JWT

    const token = generateToken(user.id);

    res.status(201).json({
      user: {
        id: user.id,
        username: user.username,
        fullName: user.fullName,
        email: user.email,
        avatar: user.avatar,
      },

      token,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: "Ошибка сервера" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Попытка входа для:", email);

    if (!email || !password) {
      return res.status(400).json({ message: "Введите email и пароль" });
    }

    // 1. Ищем пользователя

    const user = await User.findOne({
      $or: [{ email: email.trim().toLowerCase() }, { username: email.trim() }],
    });

    if (!user) {
      console.log("Ошибка: Пользователь не найден в БД"); // <-- Проверка 1

      return res.status(401).json({ message: "Неверные данные" });
    }

    console.log("Пароль из формы:", password);

    console.log("Хеш из базы:", user.password);

    // 2. Проверяем пароль

    const isMatch = await bcrypt.compare(password, user.password);

    console.log("Пароль совпал?:", isMatch); // <-- Проверка 2

    if (!isMatch) {
      return res.status(401).json({ message: "Неверные данные" });
    }
    // 3. Генерируем токен

    const token = generateToken(user.id);

    res.json({
      user: {
        id: user.id,
        username: user.username,
        fullName: user.fullName,
        email: user.email,
        avatar: user.avatar,
      },
      token,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: "Ошибка сервера" });
  }
};

export const resetPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: "Email is required" });

  // Здесь в будущем будет логика отправки письма на почту

  res.json({ message: "If this email exists, a reset link has been sent." });
};
