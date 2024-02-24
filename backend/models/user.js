const bcrypt = require("bcryptjs");
const pool = require("../db/db");

class User {
  static async register({ username, email, password }) {
    try {
      const hashedPassword = await bcrypt.hash(password, 8);
      const [results] = await pool.query(
        "INSERT INTO Users (username, email, password_hash) VALUES (?, ?, ?)",
        [username, email, hashedPassword],
      );
      return { userId: results.insertId };
    } catch (error) {
      throw new Error("Server error during registration");
    }
  }

  static async findByUsername(username) {
    try {
      const [rows] = await pool.query(
        "SELECT * FROM Users WHERE username = ?",
        [username],
      );
      if (rows.length === 0) throw new Error("User not found");
      return rows[0];
    } catch (error) {
      throw new Error("Server error while finding username");
    }
  }

  static async login({ username, password }) {
    try {
      const user = await this.findByUsername(username);
      const isMatch = bcrypt.compareSync(password, user.password_hash);
      if (!isMatch) throw new Error("Invalid password");
      return { userId: user.id };
    } catch (error) {
      throw new Error("Server error while logging in");
    }
  }
}

module.exports = User;
