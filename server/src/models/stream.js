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
    const [rows] = await pool.query("SELECT * FROM Streams WHERE id = ?", [
      streamId,
    ]);
    if (rows.length === 0) throw new Error(`Stream not found with ID: ${streamId}`);
    return rows[0];
  }

  static async searchStreams(keyword) {
    const [rows] = await pool.query(
      "SELECT * FROM Streams WHERE title LIKE ? OR description LIKE ?",
      [`%${keyword}%`, `%${keyword}%`],
    );
    if (rows.length === 0) throw new Error(`No results found for ${keyword}`);
    return rows;
  }

  static async startStream() {
    // set the local stream (id = 1) to live = 1
    const [result] = await pool.query("UPDATE Streams SET isActive = 1 WHERE id = 1");

    return result;
  }

  static async endStream() {
    // set the local stream (id = 1) to live = 0
    const [result] = await pool.query("UPDATE Streams SET isActive = 0 WHERE id = 1");

    return result;
  }

}

module.exports = Stream;
