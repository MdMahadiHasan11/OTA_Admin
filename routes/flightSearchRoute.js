const express = require("express");
const router = express.Router();
const flightsSearchController = require("../controllers/flightsSearchController");
router.get("/flights/search", flightsSearchController.getAllFlight);

module.exports = router;
