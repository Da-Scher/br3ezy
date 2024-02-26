const express = require("express");
const router = express.Router();
const streamController = require("../controllers/streamController");

router.post("/add", streamController.addStream);
router.get("/get/:streamId", streamController.getStream);
router.get("/search", streamController.searchStreams);

module.exports = router;
