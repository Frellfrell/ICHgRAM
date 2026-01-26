const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();
const app = express();
// Подключаемся к MongoDB
connectDB();
app.use(express.json()); // Для работы с JSON
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
