const jwt = require("jsonwebtoken");
const User = require("../models/user"); // Adjust the path as necessary

require("dotenv").config();
const secretKey = process.env.SECRET_KEY;

exports.register = async (req, res) => {
  try {
    const userId = await User.register(req.body);
    res.status(201).json({
      success: true,
      data: userId,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const userId = await User.login(req.body);
    const token = jwt.sign(userId, secretKey, { expiresIn: "1h" });
    res.json({
      success: true,
      token: token,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};
