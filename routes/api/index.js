const express = require("express");
const router = express.Router();
const UserRoutes = require("./user");
const userInfo = require("./userInfo");
const getAllUsers = require("./getAllUsers");
const searchUser = require("./searchUsers");
const withdrawRoutes = require("./withdraw");

router.use("/", UserRoutes);
router.use("/users", getAllUsers);
router.use("/user", userInfo);
router.use("/", searchUser);
router.use("/", withdrawRoutes);

module.exports = router;
