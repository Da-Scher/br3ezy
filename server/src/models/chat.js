const pool = require("../db/db");

class Chat {
  static async fetchChatHistory(streamId) {
    const [rows] = await pool.query(
      "SELECT * FROM Messages WHERE streamId = ? ORDER BY timestamp ASC",
      [streamId],
    );
    return rows;
  }

  static async saveMessage(message) {
    const [results] = await pool.query(
      "INSERT INTO Messages (userId, streamId, body) VALUES (?)",
      [message],
    );
    return { messageId: results.insertId };
  }
}

module.exports = Chat;
