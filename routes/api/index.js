const express = require("express");
const router = express.Router();
const uploadProfilePic = require("./uploadProfilePic.js")
const createOrUpdateOrganizationRoute = require('./organization')
const UserRoutes = require('./user')
const rewardRoutes = require('../api/reward');
const userInfo = require('./userInfo');
const getAllUsers = require('./getAllUsers');
const searchUser = require("./searchUsers")
const withdraw = require("./withdraw");

router.use('/picture', uploadProfilePic)
router.use('/organization', createOrUpdateOrganizationRoute);
router.use('/', UserRoutes)
router.use('/lunch', rewardRoutes);
router.use('/users', getAllUsers);
router.use('/user', userInfo);
router.use("/",searchUser);
router.use("/", withdraw);


module.exports = router;
