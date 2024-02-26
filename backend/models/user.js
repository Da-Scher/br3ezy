const bcrypt = require("bcryptjs");
const pool = require("../db/db");

class User {
  static async register({ username, email, password }) {
    try {
      const [rows] = await pool.query(
        "SELECT * FROM Users WHERE user = ? OR email = ?",
        [username, email],
      );
      if (rows.length > 0) throw new Error("Username or email already exist");
      const hashedPassword = await bcrypt.hash(password, 8);
      const [results] = await pool.query(
        "INSERT INTO Users (username, email, password_hash) VALUES (?, ?, ?)",
        [username, email, hashedPassword],
      );
      return { userId: results.insertId };
    } catch (error) {
      throw new Error(`Error registering user: ${error.message}`);
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
      throw new Error(`Error finding user: ${error.message}`);
    }
  }

  static async login({ username, password }) {
    try {
      const user = await this.findByUsername(username);
      const isMatch = await bcrypt.compare(password, user.password_hash);
      if (!isMatch) throw new Error("Invalid password");
      return { userId: user.id };
    } catch (error) {
      throw new Error(`Error logging in: ${error.message}`);
    }
  }
}

module.exports = User;
