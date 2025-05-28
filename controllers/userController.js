const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userController = {
  createOrUpdateUser: async (req, res) => {
    try {
      const user = req.body;
      const result = await userModel.createOrUpdateUser(user);
      if (result.matchedCount !== undefined) {
        res.send({
          message: "User updated successfully",
          matchedCount: result.matchedCount,
          modifiedCount: result.modifiedCount,
        });
      } else {
        res.send({
          message: "User created successfully",
          insertedId: result.insertedId,
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },

  getUserInfo: async (req, res) => {
    try {
      const email = req.params.email;
      const existingUser = await userModel.getUserByEmail(email);
      if (existingUser) {
        res.send({ user: existingUser });
      } else {
        res.send({ message: "User does not exist", insertedId: null });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Internal server error" });
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const result = await userModel.getAllUsers();
      res.send(result);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },

  getUsers: async (req, res) => {
    try {
      const result = await userModel.getUsersByRole("user");
      res.send(result);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },

  checkAdmin: async (req, res) => {
    try {
      const email = req.params.email;
      if (email !== req.decoded.email) {
        return res.status(403).send({ message: "unauthorized access" });
      }
      const user = await userModel.getUserByEmail(email);
      const admin = user?.role === "admin";
      res.send({ admin });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },

  checkSeller: async (req, res) => {
    try {
      const email = req.params.email;
      if (email !== req.decoded.email) {
        return res.status(403).send({ message: "unauthorized access" });
      }
      const user = await userModel.getUserByEmail(email);
      const seller = user?.role === "seller";
      res.send({ seller });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },

  updateUserRole: async (req, res) => {
    try {
      const id = req.params.id;
      const { role } = req.body;
      const updateCount = await userModel.updateUserRole(id, role);
      res.send(updateCount);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },

  createJwt: async (req, res) => {
    try {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1h",
      });
      res.send({ token });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
};

module.exports = userController;
