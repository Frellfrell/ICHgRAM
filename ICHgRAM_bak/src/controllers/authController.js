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

    // 2. Проверка уникальности
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(400).json({ message: "Пользователь уже существует" });
    }

    // 3. Хеширование пароля
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Создание пользователя
    const user = await User.create({
      username,
      fullName,
      email,
      password: hashedPassword,
    });

    // 5. JWT
    const token = generateToken(user._id);

    res.status(201).json({
      user: {
        id: user._id,
        username: user.username,
        fullName: user.fullName,
        email: user.email,
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

    if (!email || !password) {
      return res.status(400).json({ message: "Введите email и пароль" });
    }

    // 1. Ищем пользователя
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Неверные данные" });
    }

    // 2. Проверяем пароль
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Неверные данные" });
    }

    // 3. Генерируем токен
    const token = generateToken(user._id);

    res.json({
      user: {
        id: user._id,
        username: user.username,
        fullName: user.fullName,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};
