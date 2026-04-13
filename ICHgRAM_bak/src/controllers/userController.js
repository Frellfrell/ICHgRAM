import User from "../models/userModel.js";
import Post from "../models/postModel.js";
import Follow from "../models/followModel.js";

export const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    //если юзер найден
    const postsCount = await Post.countDocuments({ author: userId });

    const followersCount = await Follow.countDocuments({
      following: user._id,
    });

    const followingCount = await Follow.countDocuments({
      follower: user._id,
    });

    // Возвращаем данные пользователя + статистику
    res.status(200).json({
      ...user._doc,
      postsCount,
      followersCount: user.followers?.length || 0,
      followingCount: user.following?.length || 0,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { fullName, bio, website, username } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    //ПРОВЕРКИ УНИКАЛЬНОСТИ USERNAME
    // Если пользователь Пытается изменить username (новый не равен старому)
    if (username && username !== user.username) {
      // Ищем в базе, нет ли КОВО-ТО ДРУГОГО с таким же username
      const existingUser = await User.findOne({ username });

      // Если нашли — выдаем ошибку 400 (Bad Request)
      if (existingUser) {
        return res.status(400).json({
          message: `Username '${username}' is already taken. Please choose another.`,
        });
      }
      // Если всё ок, присваиваем новый username
      user.username = username;
    }

    //Обновление остальных полей
    if (fullName) user.fullName = fullName;
    if (bio) user.bio = bio;
    if (website !== undefined) user.website = website;

    if (req.file) {
      const base64Image = req.file.buffer.toString("base64");
      user.avatar = `data:${req.file.mimetype};base64,${base64Image}`;
    }

    // Сохраняем обновленного пользователя (Mongoose всё равно перепроверит unique)
    await user.save();
    res.json({
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
