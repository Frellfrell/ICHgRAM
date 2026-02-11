import Comment from "../models/commentModel.js";

export const addComment = async (req, res) => {
  try {
     const { text } = req.body;
    const { postId } = req.params;
