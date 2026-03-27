import Like from "../models/likeModel.js";
import Post from "../models/postModel.js";

export const toggleLike = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user._id; // Получаем id пользователя из токена

    // Ищем лайк этого пользователя для данного поста
    const existingLike = await Like.findOne({
      post: postId,
      user: userId,
    });

    if (existingLike) {
      await existingLike.deleteOne();
      //const post = await Post.findById(postId);
      const likesCount = await Like.countDocuments({ post: postId }); // Пересчитываем количество лайков

      return res.json({ liked: false, likesCount }); // Отдаем обновленное количество лайков
    }

    // Если лайка нет, добавляем новый
    await Like.create({
      post: postId,
      user: userId,
    });

    //const post = await Post.findById(postId);
    const likesCount = await Like.countDocuments({ post: postId }); // Пересчитываем количество лайков

    return res.json({ liked: true, likesCount }); // Отдаем обновленное количество лайков
  } catch (error) {
    console.error("Ошибка при постановке/удалении лайка:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

{
  /*  await Notification.create({
      recipient: post.author,
      sender: req.user.id,
      type: "like",
      post: post._id,
    });

    res.json({ liked: true });
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
};*/
}

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
