import User from "../models/userModel.js";
export const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { fullName, bio } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (fullName) user.fullName = fullName;
    if (bio) user.bio = bio;

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
