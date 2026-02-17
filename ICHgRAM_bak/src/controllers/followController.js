import Follow from "../models/followModel.js";


// Подписаться
export const followUser = async (req, res) => {
  try {
    const followerId = req.user.id; // из JWT
    const { userId } = req.params;

    // Подписаться
export const followUser = async (req, res) => {
  try {
    const followerId = req.user.id; // из JWT
    const { userId } = req.params;

    if (followerId === userId) {
      return res.status(400).json({
        message: "Нельзя подписаться на самого себя",
      });
    }