const flightSearchModel = require("../models/flightSearchModel");
const formatData = require("../formatter/flightFormatter");
const flightsSearchController = {
  getAllFlight: async (req, res) => {
    const { from, to } = req.query;
    const cacheKey = `airports_data_from_${from || "none"}_to_${to || "none"}`;

    try {
      const redisClient = req.redisClient;
      const cachedData = await redisClient.get(cacheKey);
      if (cachedData) {
        console.log("Using Redis cache");
        return res.send(JSON.parse(cachedData));
      }
      const result = await flightSearchModel.getAllFlight({ from, to });
      console.log("used database");

      // const formattedData = formatData(result, "airports");
      await redisClient.setEx(cacheKey, 600, JSON.stringify(result));
      res.send(result);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
};

module.exports = flightsSearchController;
