import Notification from "../models/notificationModel.js";
export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      recipient: req.user.id,
    })
      .populate("sender", "username fullName")
      .populate("post", "image caption")
      .sort({ createdAt: -1 });

    res.status(200).json(notifications);
  } catch (error) {
    console.error("Ошибка получения уведомлений:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};
