import Notification from "../models/notificationModel.js";

export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ recipient: req.user._id })
      .populate("sender", "username avatar")
      .populate("post", "image caption")
      .populate({
        path: "post", // Популяция поста
        select: "image caption", // Получаем данные поста
        populate: {
          path: "author", // Вложенная популяция для автора поста
          select: "username avatar", // Получаем данные о пользователе (авторе)
        },
      })
      .sort({ createdAt: -1 });

    res.status(200).json(notifications);
  } catch (error) {
    console.error("Ошибка получения уведомлений:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};
