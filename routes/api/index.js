const express = require("express");
const router = express.Router();
const UserRoutes = require("./user");
const rewardRoutes = require("../api/reward");
const userInfo = require("./userInfo");
const getAllUsers = require("./getAllUsers");
const searchUser = require("./searchUsers");
const withdraw = require("./withdraw");
const test = require("./test");

router.use("/", UserRoutes);
router.use("/lunch", rewardRoutes);
router.use("/users", getAllUsers);
router.use("/user", userInfo);
router.use("/", searchUser);
router.use("/", withdraw);
router.use("/", test);

module.exports = router;
