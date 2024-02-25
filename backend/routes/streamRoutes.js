const express = require("express");
const streamController = require("../controllers/streamController");

const router = express.Router();

router.post("/add", streamController.addStream);
router.get("/get/:stream_id", streamController.getStream);
router.get("/search", streamController.searchStreams);

module.exports = router;
