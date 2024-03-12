const express = require("express");
const router  = express.Router();
const fedeController = require("../controllers/fedeController.js");

router.post("/fedIn", fedeController.recv);

router.get("/fedOut", fedeController.breeze);

module.exports = router;
