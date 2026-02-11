import Comment from "../models/commentModel.js";

export const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const { postId } = req.params;

    if (!text) {
      return res.status(400).json({ message: "Комментарий пустой" });
    }

    const comment = await Comment.create({
      text,
      post: postId,
      author: req.user._id,
    });

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
};
