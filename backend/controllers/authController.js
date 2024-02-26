const jwt = require("jsonwebtoken");
const User = require("../models/user");

require("dotenv").config();
const secretKey = process.env.SECRET_KEY;

exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userId = await User.register(username, email, password);
    console.log("User registered successfully");
    res.status(201).json({
      success: true,
      data: userId,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const userId = await User.login(username, password);
    const token = await jwt.sign(userId, secretKey, { expiresIn: "1h" });
    console.log("User logged in successfully");
    res.json({
      success: true,
      data: {
        token: token,
      },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
