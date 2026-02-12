import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";
import http from "http";
import { Server } from "socket.io";
import { socketHandler } from "./socket.js";

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

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
