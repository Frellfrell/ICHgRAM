import Message from "./models/messegeModel.js";

const onlineUsers = new Map();

export const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("USER CONNECTED SOCKET");
    // userId берём из JWT (уже проверенного в server.js)
    const userId = socket.user.id;

    console.log(`User connected: ${userId}`);

    // Сохраняем пользователя как онлайн
    onlineUsers.set(userId, socket.id);

    // Добавляем пользователя в комнату с его ID
    socket.join(userId);

    // отправка сообщения
    socket.on("sendMessage", async ({ receiverId, text }) => {
      try {
        if (!receiverId || !text) return;

        // Сохраняем сообщение в базе
        const message = await Message.create({
          sender: userId,
          receiver: receiverId,
          text: text.trim(),
        });

        const populatedMessage = await Message.findById(message._id);
        // отправляем получателю
        io.to(receiverId).emit("receiveMessage", populatedMessage);

        // возвращаем отправителю
        io.to(userId).emit("receiveMessage", populatedMessage);
      } catch (error) {
        console.error("Ошибка отправки сообщения:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${userId}`);
      onlineUsers.delete(userId);
    });
  });
};
