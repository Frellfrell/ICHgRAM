import Message from "../models/messegeModel.js";
import User from "../models/userModel.js";

export const getConversation = async (req, res) => {
  try {
    const { userId } = req.params;

    const messages = await Message.find({
      $or: [
        { sender: req.user.id, receiver: userId },
        { sender: userId, receiver: req.user.id },
      ],
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

export const getChats = async (req, res) => {
  try {
    const currentUserId = req.user._id;

    const messages = await Message.find({
      $or: [{ sender: currentUserId }, { receiver: currentUserId }],
    }).sort({ createdAt: -1 });

    const chatMap = new Map();

    for (const msg of messages) {
      const otherUserId =
        msg.sender.toString() === currentUserId.toString()
          ? msg.receiver
          : msg.sender;

      if (!chatMap.has(otherUserId.toString())) {
        const user = await User.findById(otherUserId).select(
          "username avatar fullName",
        );
        if (!user) continue;

        chatMap.set(otherUserId.toString(), {
          user,
          lastMessage: msg.text,
          createdAt: msg.createdAt,
        });
      }
    }

    res.json(Array.from(chatMap.values()));
  } catch (err) {
    console.error("getChats error:", err);
    res.status(500).json({ message: "error" });
  }
};
