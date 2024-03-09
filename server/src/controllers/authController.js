const jwt = require("jsonwebtoken");
const User = require("../models/user");

require("dotenv").config();
const secretKey = process.env.SECRET_KEY;

exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userId = await User.register(username, email, password);
    res.sendSuccess(201, userId);
  } catch (error) {
    res.sendError(500, error);
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const userId = await User.login(username, password);
    const token = jwt.sign(userId, secretKey, { expiresIn: "1h" });
    res.sendSuccess(200, { token: token });
  } catch (error) {
    res.sendError(500, error);
  }
};
