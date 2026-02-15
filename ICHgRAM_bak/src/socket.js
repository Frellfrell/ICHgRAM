import Message from "./models/messageModel.js";

const onlineUsers = new Map();

export const socketHandler = (io) => {
  io.on("connection", (socket) => {
    const userId = socket.user.id;

    // пользователь присылает свой userId
    socket.on("join", (userId) => {
      onlineUsers.set(userId, socket.id);
      socket.join(userId); // комната = userId
    });

    // отправка сообщения
    socket.on("sendMessage", async (data) => {
      const { senderId, receiverId, text } = data;

      // сохраняем в БД
      const message = await Message.create({
        sender: senderId,
        receiver: receiverId,
        text,
      });

      // отправляем получателю
      io.to(receiverId).emit("receiveMessage", message);

      // возвращаем отправителю
      io.to(senderId).emit("receiveMessage", message);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};
