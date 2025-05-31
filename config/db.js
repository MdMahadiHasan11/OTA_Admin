// config/db.js
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.njqipnb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let flightSearchCollection;
let airportCollection;
let airlineCollection;
let bdDistrictCollection;
let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log("Using existing MongoDB connection");
    return;
  }
  try {
    await client.connect();
    const db = client.db("OTA_MANAGERS");
    flightSearchCollection = db.collection("flightSearch");
    airportCollection = db.collection("airports");

    isConnected = true;
    console.log("Successfully connected to MongoDB!");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }
};

module.exports = {
  connectDB,
  getCollections: () => {
    if (
      !isConnected ||
      !flightSearchCollection ||
      !airportCollection ||
      airlineCollection ||
      bdDistrictCollection
    ) {
      throw new Error("Database not connected. Call connectDB first.");
    }
    return {
      flightSearchCollection,
      airportCollection,
      airlineCollection,
      bdDistrictCollection,
    };
  },
};
