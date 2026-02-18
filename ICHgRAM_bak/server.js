import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";
import http from "http";
import { Server } from "socket.io";
import { socketHandler } from "./socket.js";
import jwt from "jsonwebtoken";
import followRoutes from "./src/routes/followRoutes.js";
import notificationRoutes from "./src/routes/notificationRoutes.js";
import messageRoutes from "./src/routes/messageRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// Подключаемся к MongoDB
connectDB();
// Маршруты аутентификации
app.use("/api/auth", authRoutes);
// Обработчик Socket.IOio.on("connection", (socket) => {
console.log("New client connected");
socketHandler(io);

io.use((socket, next) => {
  const token = socket.handshake.auth.token;

  if (!token) {
    return next(new Error("Нет токена"));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = decoded;
    next();
  } catch (err) {
    next(new Error("Неверный токен"));
  }
});

app.use("/api/follow", followRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/messages", messageRoutes);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
