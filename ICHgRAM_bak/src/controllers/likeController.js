import Like from "../models/likeModel.js";
import Post from "../models/postModel.js";
import Notification from "../models/notificationModel.js";

export const toggleLike = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user._id; // Получаем id пользователя из токена

    //  Ищем пост, чтобы узнать, кто автор (нужно для уведомления)
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Пост не найден" });
    }

    // Ищем лайк пользователя для данного поста
    const existingLike = await Like.findOne({
      post: postId,
      user: userId,
    });

    if (existingLike) {
      await existingLike.deleteOne();

      await Notification.findOneAndDelete({
        sender: userId,
        post: postId,
        type: "like",
      });

      const likesCount = await Like.countDocuments({ post: postId }); // Пересчитываем количество лайков

      return res.json({ liked: false, likesCount }); // Отдаем обновленное количество лайков
    }

    // Если лайка нет, добавляем новый
    await Like.create({
      post: postId,
      user: userId,
    });

    // 2. СОЗДАЕМ УВЕДОМЛЕНИЕ (только если лайкаешь не свой пост)
    if (post.author.toString() !== userId.toString()) {
      await Notification.create({
        recipient: post.author, // Автор поста
        sender: userId, // Тот, кто лайкнул
        type: "like",
        post: postId, // Передаем ID поста, чтобы в списке была картинка!
      });
    }

    const likesCount = await Like.countDocuments({ post: postId }); // Пересчитываем количество лайков

    return res.json({ liked: true, likesCount }); // Отдаем обновленное количество лайков
  } catch (error) {
    console.error("Ошибка при постановке/удалении лайка:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

export const getPostLikes = async (req, res) => {
  try {
    const { postId } = req.params;
    const likesCount = await Like.countDocuments({ post: postId });
    res.json({ likesCount });
  } catch (error) {
    console.error("Ошибка при получении лайков:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};
