const Chat = require("../models/chat");

exports.fetchChatHistory = async (req, res) => {
  try {
    const streamId = req.params.streamId;
    const messages = await Chat.fetchChatHistory(streamId);
    res.status(200).json(messages);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.addMessage = async (req, res) => {
  const { userId, streamId, message } = req.body;

  try {
    const savedMessage = await Chat.saveMessage({ userId, streamId, message });
    res.status(201).json({
      message: "Message added successfully",
      data: savedMessage,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error while adding message" });
  }
};
