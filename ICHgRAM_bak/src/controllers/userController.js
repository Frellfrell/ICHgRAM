import User from "../models/userModel.js";

export const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });

      // Считаем количество постов пользователя
      const postsCount = await Post.countDocuments({ author: userId });

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
    if (fullName) user.fullName = fullName;
    if (bio) user.bio = bio;
    if (website) user.website = website;
    if (username) user.username = username;

    if (req.file) {
      const base64Image = req.file.buffer.toString("base64");
      user.avatar = `data:${req.file.mimetype};base64,${base64Image}`;
    }
    await user.save();
    res.json({
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
