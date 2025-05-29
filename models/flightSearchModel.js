const { getCollections } = require("../config/db");
// const { getAllFlight } = require("../controllers/flightsSearchController");

const flightSearchModel = {
  getAllFlight: async () => {
    const { flightSearchCollection } = getCollections();
    return await flightSearchCollection.findOne();
  },
};

module.exports = flightSearchModel;
