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

export const getPostComments = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .populate("author", "username avatar")
      .sort({ createdAt: 1 });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
};
