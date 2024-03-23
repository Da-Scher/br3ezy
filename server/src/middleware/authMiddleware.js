const jwt = require("jsonwebtoken");

require("dotenv").config();
const secretKey = process.env.SECRET_KEY;

exports.authHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    const error = new Error(
      "Unauthorized Access: Missing authorization header",
    );
    return res.sendError(401, error);
  }

  const token = authHeader.split(" ")[1];

  try {
    const { user } = jwt.verify(token, secretKey);
    req.user = user;
    next();
  } catch (error) {
    res.sendError(403, error);
  }
};

exports.adminHandler = (req, res, next) => {
  if (req.user.role !== "admin") {
    const error = new Error("Access denied: Must be an administrator");
    return res.sendError(403, error);
  }
  res.sendSuccess(200, { isAdmin: true });
};
