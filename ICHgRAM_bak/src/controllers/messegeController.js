import Message from "../models/messageModel.js";
export const getConversation = async (req, res) => {
  try {
    const { userId } = req.params;