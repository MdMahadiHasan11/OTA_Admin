const express = require("express");
const router = express.Router();
const publicController = require("../controllers/publicController");
router.get("/airports", publicController.getAirports);

module.exports = router;
