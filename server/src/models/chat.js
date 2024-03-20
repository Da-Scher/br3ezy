const pool = require("../db/db");

class Chat {
  static async fetchChatHistory(streamId) {
    const [rows] = await pool.query(
      "SELECT * FROM messages WHERE streamId = ? ORDER BY timestamp ASC",
      [streamId],
    );
    return rows;
  }

  static async saveMessage(userId, streamId, message) {
    const [results] = await pool.query(
      "INSERT INTO messages (userId, streamId, body) VALUES (?, ?, ?)",
      [userId, streamId, message],
    );
    return { messageId: results.insertId };
  }
}

module.exports = Chat;
