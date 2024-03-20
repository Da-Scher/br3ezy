const express = require("express");
const router = express.Router();
const analyticsController = require("../controllers/analyticsController");

router.post("/session", analyticsController.startSession);
router.patch("/session", analyticsController.endSession);
router.post("/metrics", analyticsController.saveMetrics);

module.exports = router;
