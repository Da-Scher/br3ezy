const pool = require("../db/db");

class Stream {
  static async createStream(userId, title, description, photo) {
    const [results] = await pool.query(
      "INSERT INTO streams (userId, title, description, photo) VALUES (?, ?, ?, ?)",
      [userId, title, description, photo],
    );
    return { streamId: results.insertId };
  }

  static async getStream(streamId) {
    const [rows] = await pool.query("SELECT * FROM streams WHERE id = ?", [
      streamId,
    ]);
    if (rows.length === 0)
      throw new Error(`Stream not found with ID: ${streamId}`);
    return rows[0];
  }

  static async searchStreams(keyword) {
    const [rows] = await pool.query(
      "SELECT * FROM streams WHERE title LIKE ? OR description LIKE ?",
      [`%${keyword}%`, `%${keyword}%`],
    );
    if (rows.length === 0) throw new Error(`No results found for ${keyword}`);
    return rows;
  }
}

module.exports = Stream;
