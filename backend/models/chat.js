const pool = require("../db/db");

class Chat {
  static async fetchChatHistory(streamId) {
    const [messages] = await pool.query(
      "SELECT * FROM Messages WHERE stream_id = ? ORDER BY timestamp ASC",
      [streamId],
    );
    return messages;
  }

  static async saveMessage({ userId, streamId, message }) {
    try {
      const [results] = await pool.query(
        "INSERT INTO Messages (user_id, stream_id, body) VALUES (?, ?, ?)",
        [userId, streamId, message],
      );
      return { messageId: results.insertId };
    } catch (error) {
      throw new Error("Server error during message");
    }
  }
}

module.exports = Chat;
