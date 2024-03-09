const Chat = require("../models/chat");

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("A user connected to chat");

    socket.on("disconnect", () => {
      console.log("User disconnected from chat");
    });

    socket.on("newMessage", async (msg) => {
      console.log("New message:", msg);
      try {
        await Chat.saveMessage(msg);
        io.emit("receiveMessage", msg);
      } catch (error) {
        console.error("Error saving message:", error);
      }
    });
  });
};
