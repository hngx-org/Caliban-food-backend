const express = require("express");
const router = express.Router();

const uploadProfilePic = require("./uploadProfilePic.js");
const createOrUpdateOrganizationRoute = require("./organization");
const UserRoutes = require("./user");

const rewardRoutes = require("../api/reward");
const userInfo = require("./userInfo");
const getAllUsers = require("./getAllUsers");
const searchUser = require("./searchUsers");
const withdraw = require("./withdraw");
const test = require("./test");
const organization = require("./organization");

router.use("/picture", uploadProfilePic);
router.use("/organization", createOrUpdateOrganizationRoute);
router.use("/auth", UserRoutes);
router.use("/lunch", rewardRoutes);
router.use("/users", getAllUsers);
router.use("/user", userInfo);
router.use("/", searchUser);
router.use("/", withdraw);
router.use("/", test);
router.use("/organization", organization);

module.exports = router;
