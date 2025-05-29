const flightSearchModel = require("../models/flightSearchModel");
require("dotenv").config();

const flightsSearchController = {
  getAllFlight: async (req, res) => {
    try {
      const result = await flightSearchModel.getAllFlight();
      console.log(result);
      res.send(result);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
};

module.exports = flightsSearchController;
