const express = require("express");
const router = express.Router();
const streamController = require("../controllers/streamController");

router.post("/add", streamController.addStream);
router.get("/get/:stream_id", streamController.searchStream);
router.get("/search", streamController.searchStreams);
router.get("/find", streamController.getStream);

module.exports = router;
