const pool = require("../db/db");

class Chat {
  static async fetchChatHistory(streamId) {
    try {
      const [messages] = await pool.query(
        "SELECT * FROM Messages WHERE streamId = ? ORDER BY timestamp ASC",
        [streamId],
      );
      return messages;
    } catch (error) {
      throw new Error(`Error fetching chat history: ${error.message}`);
    }
  }

  static async saveMessage({ userId, streamId, message }) {
    try {
      const [results] = await pool.query(
        "INSERT INTO Messages (userId, streamId, body) VALUES (?, ?, ?)",
        [userId, streamId, message],
      );
      return { messageId: results.insertId };
    } catch (error) {
      throw new Error(`Error saving message: ${error.message}`);
    }
  }
}

module.exports = Chat;
