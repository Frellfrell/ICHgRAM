import Message from "./models/messageModel.js";

const onlineUsers = new Map();

export const socketHandler = (io) => {
  io.on("connection", (socket) => {
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
          text,
        });

        // отправляем получателю
        io.to(receiverId).emit("receiveMessage", message);

        // возвращаем отправителю
        io.to(userId).emit("receiveMessage", message);
      } catch (error) {
        console.error("Ошибка отправки сообщения:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};
