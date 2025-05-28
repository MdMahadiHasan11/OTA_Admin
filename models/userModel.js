const { getCollections } = require("../config/db");
const { ObjectId } = require("mongodb");

const userModel = {
  createOrUpdateUser: async (user) => {
    const { userCollection } = getCollections();
    const query = { email: user.email };
    const existingUser = await userCollection.findOne(query);

    if (existingUser) {
      const update = {
        $set: { name: user.name, image: user.image },
      };
      return await userCollection.updateOne(query, update);
    }

    return await userCollection.insertOne(user);
  },

  getUserByEmail: async (email) => {
    const { userCollection } = getCollections();
    return await userCollection.findOne({ email });
  },

  getAllUsers: async () => {
    const { userCollection } = getCollections();
    return await userCollection.find().toArray();
  },

  getUsersByRole: async (role) => {
    const { userCollection } = getCollections();
    return await userCollection.find({ role }).toArray();
  },

  updateUserRole: async (id, role) => {
    const { userCollection } = getCollections();
    const query = { _id: new ObjectId(id) };
    const updatedDoc = { $set: { role } };
    return await userCollection.updateOne(query, updatedDoc);
  },
};

module.exports = userModel;
