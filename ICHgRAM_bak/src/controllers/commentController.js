import Comment from "../models/commentModel.js";
import Post from "../models/postModel.js";
import Notification from "../models/notificationModel.js";

export const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const { postId } = req.params;
    const userId = req.user._id;

    if (!text) {
      return res.status(400).json({ message: "Комментарий пустой" });
    }

    // Сначала находим пост, чтобы знать, кому отправить уведомление
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Пост не найден" });
    }

    const comment = await Comment.create({
      text,
      post: postId,
      author: req.user._id,
    });

    // Наполняем данными автора
    const populatedComment = await Comment.findById(comment._id).populate(
      "author",
      "username avatar",
    );

    // Создаем уведомление автору поста (если это не сам автор комментирует)
    if (post.author.toString() !== req.user._id.toString()) {
      await Notification.create({
        recipient: post.author, //кому
        sender: req.user._id, // от кого
        type: "comment",
        post: postId,
        сomment: comment._id, // ссылка на комментарий
      });
    }

    res.status(201).json(populatedComment);
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

export const getPostComments = async (req, res) => {
  try {
    const { postId } = req.params;

    const comments = await Comment.find({ post: postId })
      .populate("author", "username avatar")
      .sort({ createdAt: 1 });

    res.json(comments);
  } catch (error) {
    console.error("Ошибка при получении комментариев:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user._id;

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: "Комментарий не найден" });
    }

    // Проверяем, что удаляет именно автор комментария
    if (comment.author.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Нет прав на удаление" });
    }

    await comment.deleteOne();
    res.json({ message: "Комментарий удален" });
  } catch (error) {
    console.error("Ошибка при удалении комментария:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};
