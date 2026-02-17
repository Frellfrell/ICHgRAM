import Follow from "../models/followModel.js";


// Подписаться
export const followUser = async (req, res) => {
  try {
    const followerId = req.user.id; // из JWT
    const { userId } = req.params;

    // Подписаться
export const followUser = async (req, res) => {
  try {
    const followerId = req.user.id; // из JWT
    const { userId } = req.params;

    if (followerId === userId) {
      return res.status(400).json({
        message: "Нельзя подписаться на самого себя",
      });
    }

    const existingFollow = await Follow.findOne({
      follower: followerId,
      following: userId,
    });

     if (existingFollow) {
      return res.status(400).json({
        message: "Вы уже подписаны",
      });
    }

    await Follow.create({
      follower: followerId,
      following: userId,
    });

     res.json({ message: "Подписка оформлена" });
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
};