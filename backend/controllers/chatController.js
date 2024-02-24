const Chat = require("../models/chat");

exports.fetchChatHistory = async (req, res) => {
  try {
    const streamId = req.params.streamId;
    const messages = await Chat.fetchChatHistory(streamId);
    res.status(200).json({
      success: true,
      data: messages,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.addMessage = async (req, res) => {
  const { userId, streamId, message } = req.body;

  try {
    const messageId = await Chat.saveMessage({ userId, streamId, message });
    res.status(201).json({
      success: true,
      data: messageId,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};
