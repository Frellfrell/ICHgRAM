import User from "../models/userModel.js";

// Контроллер для поиска пользователей
export const searchUsers = async (req, res) => {
  try {
    const { query } = req.query;