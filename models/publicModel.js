const { getCollections } = require("../config/db");

const publicModel = {
  getAirlines: async () => {
    const { airlineCollection } = getCollections();
    return await airlineCollection.find().toArray();
  },
  getAirports: async () => {
    const { airportCollection } = getCollections();
    return await airportCollection.find().toArray();
  },
  getBdDistricts: async () => {
    const { bdDistrictCollection } = getCollections();
    return await bdDistrictCollection.find.toArray();
  },
};

module.exports = publicModel;
