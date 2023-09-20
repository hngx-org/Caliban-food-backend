const express = require("express");
const router = express.Router();
const UserRoutes = require("./user");
const RewardRoutes = require("./reward");

router.use("/", UserRoutes);
router.use("/lunch", RewardRoutes);

module.exports = router;
