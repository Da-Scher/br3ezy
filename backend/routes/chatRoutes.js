const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");

router.get("/messages/:streamId", chatController.fetchChatHistory);
router.post("/messages/add", chatController.addMessage);

module.exports = router;
