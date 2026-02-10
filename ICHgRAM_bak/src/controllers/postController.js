import Post from "../models/postModel.js";
export const createPost = async (req, res) => {
  try {
    const { text } = req.body;

     if (!req.file) {
      return res.status(400).json({ message: "Изображение обязательно" });
    }

    const base64Image = req.file.buffer.toString("base64");
    
    const post = await Post.create({
      text,