const flightSearchModel = require("../models/flightSearchModel");
// require("dotenv").config();
const formatData = require("../formatter/flightFormatter");
const flightsSearchController = {
  getAllFlight: async (req, res) => {
    const { from, to } = req.query;
    const cacheKey = `airports_data_from_${from || "none"}_to_${to || "none"}`;

    try {
      const redisClient = req.redisClient;
      const cachedData = await redisClient.get(cacheKey);
      if (cachedData) {
        return res.send(JSON.parse(cachedData));
      }
      const result = await flightSearchModel.getAllFlight({ from, to });
      const formattedData = formatData(result, "airports");
      await redisClient.setEx(cacheKey, 600, JSON.stringify(formattedData));
      res.send(formattedData);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
};

module.exports = flightsSearchController;
