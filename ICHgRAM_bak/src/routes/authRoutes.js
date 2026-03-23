import express from "express";
import { register, login } from "../controllers/authController.js";

const router = express.Router();

// Register route
router.post("/register", register);
// Login route
router.post("/login", login);
// Reset password route (в разработке)
router.post("/reset-password", (req, res) => {
  res.json({ message: "Инструкции отправлены на email (в разработке)" });
});
export default router;
