const { getCollections } = require("../config/db");

const verifyAdmin = async (req, res, next) => {
  const { userCollection } = getCollections();
  const email = req.decoded.email;
  const query = { email: email };
  const user = await userCollection.findOne(query);
  const isAdmin = user?.role === "admin";
  if (!isAdmin) {
    return res.status(403).send({ message: "forbidden access" });
  }
  next();
};

module.exports = verifyAdmin;
