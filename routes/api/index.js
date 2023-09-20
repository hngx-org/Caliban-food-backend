const express = require("express");
const router = express.Router();
const UserRoutes = require("./user");

router.use("/", UserRoutes);

module.exports = router;