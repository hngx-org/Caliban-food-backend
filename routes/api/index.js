const express = require("express");
const router = express.Router();
<<<<<<< HEAD
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
=======
const UserRoutes = require('./user')
const rewardRoutes = require('../api/reward');
const userInfo = require('./userInfo');
const getAllUsers = require('./getAllUsers');
const searchUser = require("./searchUsers")
const withdraw = require("./withdraw");

router.use('/', UserRoutes)
router.use('/lunch', rewardRoutes);
router.use('/users', getAllUsers);
router.use('/user', userInfo);
router.use("/",searchUser);
router.use("/", withdraw);
>>>>>>> origin/main

module.exports = router;
