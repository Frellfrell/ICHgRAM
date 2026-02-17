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