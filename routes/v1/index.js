const express = require("express");
const router = express.Router();
const UserRoutes = require("./user");
const CreateOrganizationRoute = require('./organization')

router.use("/", UserRoutes);
router.use('/organization', CreateOrganizationRoute)

module.exports = router;