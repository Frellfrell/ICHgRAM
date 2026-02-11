import Like from "../models/likeModel.js";

export const toggleLike = async (req, res) => {
  try {
    const { postId } = req.params;

    const existingLike = await Like.findOne({
      post: postId,
      user: req.user._id,
    });

    if (existingLike) {
      await existingLike.deleteOne();
      return res.json({ liked: false });
    }
    await Like.create({
      post: postId,
      user: req.user._id,
    });

    res.json({ liked: true });
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
};
