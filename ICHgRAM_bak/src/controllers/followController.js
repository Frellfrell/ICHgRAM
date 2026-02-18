import Follow from "../models/followModel.js";
import Notification from "../models/notificationModel.js";

// Подписаться
export const followUser = async (req, res) => {
  try {
    const followerId = req.user.id; // из JWT
    const { userId } = req.params;

    if (followerId === userId) {
      return res.status(400).json({
        message: "Нельзя подписаться на самого себя",
      });
    }

    const existingFollow = await Follow.findOne({
      follower: followerId,
      following: userId,
    });

    if (existingFollow) {
      return res.status(400).json({
        message: "Вы уже подписаны",
      });
    }

    await Follow.create({
      follower: followerId,
      following: userId,
    });

    await Notification.create({
      recipient: userId, // на кого подписались
      sender: req.user.id, // кто подписался
      type: "follow",
    });

    res.json({ message: "Подписка оформлена" });
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

// Отписаться
export const unfollowUser = async (req, res) => {
  try {
    const followerId = req.user.id;
    const { userId } = req.params;

    await Follow.findOneAndDelete({
      follower: followerId,
      following: userId,
    });

    res.json({ message: "Вы отписались" });
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

// Получить подписчиков
export const getFollowers = async (req, res) => {
  try {
    const { userId } = req.params;
    const followers = await Follow.find({
      following: userId,
    }).populate("follower", "username fullName");

    res.json(followers);
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

// Получить тех, на кого подписан
export const getFollowing = async (req, res) => {
  try {
    const { userId } = req.params;

    const following = await Follow.find({
      follower: userId,
    }).populate("following", "username fullName");

    res.json(following);
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
};
