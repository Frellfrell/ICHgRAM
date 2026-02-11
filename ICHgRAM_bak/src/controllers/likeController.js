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