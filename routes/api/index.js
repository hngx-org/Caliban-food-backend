const express = require("express");
const router = express.Router();
const UserRoutes = require("./user");
const uploadProfilePic = require("./uploadProfilePic.js")
const createOrUpdateOrganizationRoute = require('./organization')

router.use('/', UserRoutes)
//router.use('/lunch', rewardRoutes);
//router.use('/users', getAllUsers);
//router.use('/user', userInfo);
//router.use("/",searchUser);
router.use('/picture', uploadProfilePic)
router.use('/organization', createOrUpdateOrganizationRoute);

module.exports = router;
