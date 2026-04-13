import Post from "../models/postModel.js";
import Like from "../models/likeModel.js";

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
      image: image,
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    // Получаем номер страницы и лимит из запроса (по умолчанию 1 страница и 4 поста)
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;
    const skip = (page - 1) * limit;

    const currentUserId = req.user?._id;

    const posts = await Post.find()
      .populate("author", "username avatar")
      .sort({ createdAt: -1 })
      .skip(skip) // Пропускаем посты предыдущих страниц
      .limit(limit); // Берем только нужное количество

    // Добавляем подсчет лайков из LikeModel для каждого поста
    const postsWithLikes = await Promise.all(
      posts.map(async (post) => {
        const likesCount = await Like.countDocuments({ post: post._id });
        const isFollowed = await Follow.findOne({
          follower: currentUserId,
          following: post.author._id,
        });

        return {
          ...post._doc,
          likesCount: likesCount,
          author: {
            ...post.author._doc,
            isFollowed: !!isFollowed, // Добавляем статус подписки
          },
        };
      }),
    );

    res.json(postsWithLikes);
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

export const getUserPost = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.params.userId })
      .populate("author", "username avatar")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId).populate(
      "author",
      "username fullName avatar",
    );
    if (!post) {
      return res.status(404).json({ message: "Пост не найден" });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

export const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ message: "Пост не найден" });
    }

    if (!post.author.equals(req.user.id)) {
      return res.status(403).json({ message: "Нет доступа" });
    }

    if (req.body.caption !== undefined) {
      post.caption = req.body.caption;
    }

    if (req.file) {
      const base64Image = req.file.buffer.toString("base64");
      post.image = `data:${req.file.mimetype};base64,${base64Image}`;
    }

    if (!post.caption && !post.image) {
      return res.status(400).json({
        message: "Пост не может быть пустым",
      });
    }

    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ message: "Пост не найден" });
    }

    if (!post.author.equals(req.user._id)) {
      return res.status(403).json({ message: "Нет доступа" });
    }

    await post.deleteOne({ _id: req.params.postId });
    res.json({ message: "Пост удален" });
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

export const getExplorePosts = async (req, res) => {
  try {
    const posts = await Post.aggregate([
      { $sample: { size: 10 } }, // Выбираем случайные 10 постов
      {
        $lookup: {
          from: "users",
          localField: "author",
          foreignField: "_id",
          as: "author",
        },
      },
      { $unwind: "$author" },
    ]);

    res.json(posts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Ошибка сервера при получении постов для Explore" });
  }
};
