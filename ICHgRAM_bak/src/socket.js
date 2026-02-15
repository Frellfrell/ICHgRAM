import Message from "./models/messageModel.js";

const onlineUsers = new Map();

export const socketHandler = (io) => {

     io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

   // пользователь присылает свой userId
    socket.on("join", (userId) => {
      onlineUsers.set(userId, socket.id);
      socket.join(userId); // комната = userId
    });
    
    