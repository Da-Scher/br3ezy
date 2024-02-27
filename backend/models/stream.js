const pool = require("../db/db");

class Stream {
  static async createStream(userId, title, description, photo) {
    const [results] = await pool.query(
      "INSERT INTO Streams (userId, title, description, photo) VALUES (?, ?, ?, ?)",
      [userId, title, description, photo],
    );
    return { streamId: results.insertId };
  }

  static async getStream(streamId) {
    const [stream] = await pool.query("SELECT * FROM Streams WHERE id = ?", [
      streamId,
    ]);
    return stream ? { stream: stream[0] } : null;
  }

  static async searchStreams(keyword) {
    const [streams] = await pool.query(
      "SELECT * FROM Streams WHERE title LIKE ? OR description LIKE ?",
      [`%${keyword}%`, `%${keyword}%`],
    );
    return streams;
  }
}

module.exports = Stream;
