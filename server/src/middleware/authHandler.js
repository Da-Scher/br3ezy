require("dotenv").config();
const jwt = require("jsonwebtoken");

const secretKey = process.env.SECRET_KEY;

exports.authHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];

  try {
    const userId = jwt.verify(token, secretKey);
    req.userId = userId;
    next();
  } catch (error) {
    res.sendError(403, error);
  }
};
