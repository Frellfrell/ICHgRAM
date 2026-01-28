import User from "../models/userModel.js";
export const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;