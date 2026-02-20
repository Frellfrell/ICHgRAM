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
import searchRoutes from "./src/routes/searchRoutes.js";
import postRoutes from "./src/routes/postRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import likeRoutes from "./src/routes/likeRoutes.js";
import commentRoutes from "./src/routes/commentRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // "http://localhost:5173"
  },
});

// Подключаемся к MongoDB
connectDB();

io.use((socket, next) => {
  try {
    const token = socket.handshake.auth?.token;

    if (!token) {
      return next(new Error("Нет токена"));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = decoded;
    next();
  } catch (err) {
    next(new Error("Неверный токен"));
  }
});

socketHandler(io);

// Маршруты API
app.use("/api/auth", authRoutes);
app.use("/api/follow", followRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);
app.use("/api/users/search", searchRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/comments", commentRoutes);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
