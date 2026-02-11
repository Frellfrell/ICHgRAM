import Comment from "../models/commentModel.js";

export const addComment = async (req, res) => {
  try {
     const { text } = req.body;
    const { postId } = req.params;


     if (!text) {
      return res.status(400).json({ message: "Комментарий пустой" });
    }
