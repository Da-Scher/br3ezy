const pool = require("../db/db");

class Stream {
  static async createStream({ userId, title, description, photo }) {
    try {
      const [results] = await pool.query(
        "INSERT INTO Streams (user_id, title, description, photo) VALUES (?, ?, ?, ?)",
        [userId, title, description, photo],
      );
      return { streamId: results.insertId };
    } catch (error) {
      throw new Error("Server error while creating stream");
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
      throw new Error("Server error while searching streams");
    }
  }
}

module.exports = Stream;
