const pool = require("../db/db");

class Stream {
  static async createStream({ userId, title, description, photo }) {
    try {
      const [results] = await pool.query(
        "INSERT INTO Streams (userId, title, description, photo) VALUES (?, ?, ?, ?)",
        [userId, title, description, photo],
      );
      return { streamId: results.insertId };
    } catch (error) {
      throw new Error(`Error adding stream: ${error.message}`);
    }
  }

  static async getStream(streamId) {
    try {
      const [stream] = await pool.query("SELECT * FROM Streams WHERE id = ?", [
        streamId,
      ]);
      return stream ? { stream: stream[0] } : null;
    } catch (error) {
      throw new Error(`Error finding stream: ${error.message}`);
    }
  }

  static async searchStreams(keyword) {
    try {
      const [streams] = await pool.query(
        "SELECT * FROM Streams WHERE title LIKE ? OR description LIKE ?",
        [`%${keyword}%`, `%${keyword}%`],
      );
      return streams;
    } catch (error) {
      throw new Error(`Error searching streams: ${error.message}`);
    }
  }
}

module.exports = Stream;
