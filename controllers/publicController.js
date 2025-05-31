// publicController.js
const publicModel = require("../models/publicModel");
const formatData = require("./../formatter/flightFormatter");
// Function to format data (customize as needed)

const publicController = {
  getAirlines: async (req, res) => {
    const cacheKey = "airlines_data";
    try {
      const redisClient = req.redisClient;

      // Check Redis cache
      const cachedData = await redisClient.get(cacheKey);
      if (cachedData) {
        return res.send(JSON.parse(cachedData));
      }

      // Fetch from database
      const result = await publicModel.getAirlines();
      // Format the data
      const formattedData = formatData(result, "airlines");
      // Store in Redis with 10-minute expiration (600 seconds)
      await redisClient.setEx(cacheKey, 600, JSON.stringify(formattedData));
      res.send(formattedData);
    } catch (error) {
      console.error("Error in getAirlines:", error);
      res.status(500).send("Internal server error");
    }
  },

  getAirports: async (req, res) => {
    const cacheKey = "airports_data";
    try {
      const redisClient = req.redisClient;

      // Check Redis cache
      const cachedData = await redisClient.get(cacheKey);
      if (cachedData) {
        return res.send(JSON.parse(cachedData));
      }

      // Fetch from database
      const result = await publicModel.getAirports();
      // Format the data
      const formattedData = formatData(result, "airports");
      // Store in Redis with 10-minute expiration
      await redisClient.setEx(cacheKey, 600, JSON.stringify(formattedData));
      res.send(formattedData);
    } catch (error) {
      console.error("Error in getAirports:", error);
      res.status(500).send("Internal server error");
    }
  },

  getBdDistricts: async (req, res) => {
    const cacheKey = "bd_districts_data";
    try {
      const redisClient = req.redisClient;

      // Check Redis cache
      const cachedData = await redisClient.get(cacheKey);
      if (cachedData) {
        return res.send(JSON.parse(cachedData));
      }

      // Fetch from database (fixed missing await)
      const result = await publicModel.getBdDistricts();
      // Format the data
      const formattedData = formatData(result, "bd_districts");
      // Store in Redis with 10-minute expiration
      await redisClient.setEx(cacheKey, 600, JSON.stringify(formattedData));
      res.send(formattedData);
    } catch (error) {
      console.error("Error in getBdDistricts:", error);
      res.status(500).send("Internal server error");
    }
  },
};

module.exports = publicController;
