const bcrypt = require("bcryptjs");
const pool = require("../db/db");

class User {
  static async register(username, email, password) {
    await this.checkUser(username, email);
    const hashedPassword = await bcrypt.hash(password, 8);
    const [results] = await pool.query(
      "INSERT INTO Users (username, email, passwordHash) VALUES (?, ?, ?)",
      [username, email, hashedPassword],
    );
    return { userId: results.insertId };
  }

  static async login(username, password) {
    const user = await this.findByUsername(username);
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) throw new Error("Invalid password");
    return { userId: user.id };
  }

  static async checkUser(username, email) {
    const [rows] = await pool.query(
      "SELECT * FROM Users WHERE username = ? OR email = ?",
      [username, email],
    );
    if (rows.length > 0) throw new Error("Username or email already exist");
  }

  static async findByUsername(username) {
    const [rows] = await pool.query(
      "SELECT * FROM Users WHERE username = ?",
      [username],
    );
    if (rows.length === 0) throw new Error("User not found");
    return rows[0];
  }
}

module.exports = User;
