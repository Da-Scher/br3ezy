const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { authHandler, adminHandler } = require("../middleware/authMiddleware");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/", authHandler, adminHandler);

module.exports = router;
