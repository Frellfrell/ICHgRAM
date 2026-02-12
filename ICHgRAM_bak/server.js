import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";
import http from "http";
import { Server } from "socket.io";

dotenv.config();
const app = express();

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
app.use(express.json()); // Для работы с JSON

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
