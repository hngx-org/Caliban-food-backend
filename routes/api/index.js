const express = require("express");
const router = express.Router();
const UserRoutes = require("./user");
const createOrUpdateOrganizationRoute = require('./organization')

router.use('/', UserRoutes)
router.use('/lunch', rewardRoutes);
router.use('/users', getAllUsers);
router.use('/user', userInfo);
router.use("/",searchUser);
router.use('/organization', createOrUpdateOrganizationRoute);

module.exports = router;
