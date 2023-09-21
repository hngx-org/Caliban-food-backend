const express = require('express');
const router = express.Router();
const rewardRoutes = require('./reward');
const userInfo = require('./userInfo');
const getAllUsers = require('./getAllUsers');
const searchUser = require("./searchUsers")

router.use('/lunch', rewardRoutes);
router.use('/users', getAllUsers);
router.use('/user', userInfo);
router.use("/",searchUser);

module.exports = router;
