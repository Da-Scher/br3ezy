const Chat = require("../models/chat");

exports.fetchChatHistory = async (req, res) => {
  const streamId = req.params.streamId;

  try {
    const messages = await Chat.fetchChatHistory(streamId);
    console.log("Chat history fetched successfully");
    res.status(200).json({
      success: true,
      data: messages,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.addMessage = async (req, res) => {
  const { userId, streamId, message } = req.body;

  try {
    const messageId = await Chat.saveMessage({ userId, streamId, message });
    console.log("Message saved successfully");
    res.status(201).json({
      success: true,
      data: messageId,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
