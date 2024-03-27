const express = require("express");
const router = express.Router();
const streamController = require("../controllers/streamController");

// we've recieved a request to update the federation.
// TODO: crypto fedID
router.post("/fedeIn/", streamController.updateFederationStream);

module.exports = router;