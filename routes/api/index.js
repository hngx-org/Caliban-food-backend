const express = require("express");
const router = express.Router();
const UserRoutes = require("./user");
const CreateOrgRoute = require('./organization')

router.use("/", UserRoutes);
router.use('/create', CreateOrgRoute); //create organization route

module.exports = router;