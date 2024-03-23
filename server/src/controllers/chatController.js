const Chat = require("../models/chat");

exports.fetchChatHistory = async (req, res) => {
  const { streamId } = req.params;

  try {
    const messages = await Chat.fetchChatHistory(streamId);
    res.sendSuccess(200, messages);
  } catch (error) {
    res.sendError(500, error);
  }
};

exports.addMessage = async (req, res) => {
  const { userId, streamId, message } = req.body;
  try {
    const messageId = await Chat.saveMessage(userId, streamId, message);
    res.sendSuccess(201, messageId);
  } catch (error) {
    res.sendError(500, error);
  }
};
