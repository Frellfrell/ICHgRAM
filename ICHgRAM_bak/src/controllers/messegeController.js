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
    const userId = req.user.id;

    const messages = await Message.find({
      $or: [{ sender: userId }, { receiver: userId }],
    }).sort({ createdAt: -1 });

    const chatMap = new Map();

    for (const msg of messages) {
      const otherId =
        msg.sender.toString() === userId
          ? msg.receiver.toString()
          : msg.sender.toString();

      if (!chatMap.has(otherId)) {
        const user = await User.findById(otherId).select(
          "username avatar fullName",
        );

        chatMap.set(otherId, {
          user,
          lastMessage: msg.text,
          createdAt: msg.createdAt,
        });
      }
    }

    res.json(Array.from(chatMap.values()));
  } catch (err) {
    res.status(500).json({ message: "error" });
  }
};
