const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const verifyToken = require("../middleware/verifyToken");
const verifyAdmin = require("../middleware/verifyAdmin");

router.post("/jwt", userController.createJwt);
router.post("/user", userController.createOrUpdateUser);
router.get("/userInfo/:email", userController.getUserInfo);
router.get("/users", userController.getUsers);
router.get("/allUser", userController.getAllUsers);
router.get("/user/admin/:email", verifyToken, userController.checkAdmin);
router.get("/user/seller/:email", verifyToken, userController.checkSeller);
router.patch(
  "/user/admin/:id",
  verifyToken,
  verifyAdmin,
  userController.updateUserRole
);

module.exports = router;
