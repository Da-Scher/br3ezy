const pool = require("../db/db");

class Chat {
  static async fetchChatHistory(streamId) {
    try {
      const [messages] = await pool.query(
        "SELECT * FROM Messages WHERE stream_id = ? ORDER BY timestamp ASC",
        [streamId],
      );
      return messages;
    } catch (error) {
      throw new Error("Server error while fetching chat history");
    }
  }

  static async saveMessage({ userId, streamId, message }) {
    try {
      const [results] = await pool.query(
        "INSERT INTO Messages (user_id, stream_id, body) VALUES (?, ?, ?)",
        [userId, streamId, message],
      );
      return { messageId: results.insertId };
    } catch (error) {
      throw new Error("Server error while saving message");
    }
  }
}

module.exports = Chat;
