const express = require("express");
const router = express.Router();
const UserRoutes = require("./user");
const CreateOrganizationRoute = require('../../controllers/organization').createOrg

router.use("/", UserRoutes);
router.use('/organization', CreateOrganizationRoute)

module.exports = router;
