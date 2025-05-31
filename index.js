// index.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connectDB } = require("./config/db");
const flightSearchRoute = require("./routes/flightSearchRoute");
const publicRoute = require("./routes/publicRoute");
const app = express();
const port = process.env.PORT || 5000;
const redis = require("redis");

const redisClient = redis.createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: "redis-19600.c280.us-central1-2.gce.redns.redis-cloud.com",
    port: 19600,
  },
});

redisClient
  .connect()
  .then(() => console.log("Connected to Redis"))
  .catch((err) => console.error("Redis connection error:", err));

// Middleware
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());

// Pass redisClient to routes
app.use((req, res, next) => {
  req.redisClient = redisClient;
  next();
});

// Routes
app.use(flightSearchRoute);
app.use(publicRoute);

// Root Route
app.get("/", (req, res) => {
  res.send("OTA is running");
});

// Start Server
async function startServer() {
  await connectDB();
  app.listen(port, () => {
    console.log(`OTA is running on port ${port}`);
  });
}

startServer().catch(console.dir);
