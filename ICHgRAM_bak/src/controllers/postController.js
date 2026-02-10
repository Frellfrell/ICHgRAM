import Post from "../models/postModel.js";
export const createPost = async (req, res) => {
  try {
    const { caption } = req.body;

    let image = "";

    // если изображение передано
    if (req.file) {
      const base64Image = req.file.buffer.toString("base64");
      image = `data:${req.file.mimetype};base64,${base64Image}`;
    }

    // запрет пустого поста
    if (!caption && !image) {
      return res.status(400).json({
        message: "Пост не может быть пустым",
      });
    }

    const post = await Post.create({
      author: req.user._id,
      caption,
      image: `data:${req.file.mimetype};base64,${base64Image}`,
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
