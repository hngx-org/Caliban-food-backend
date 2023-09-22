const express = require("express");
const router = express.Router();
<<<<<<< HEAD
const UserRoutes = require("./user");
const userInfo = require("./userInfo");
const getAllUsers = require("./getAllUsers");
const searchUser = require("./searchUsers");
const withdrawRoutes = require("./withdraw");

router.use("/", UserRoutes);
router.use("/users", getAllUsers);
router.use("/user", userInfo);
router.use("/", searchUser);
router.use("/", withdrawRoutes);
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
>>>>>>> 5f42e90a05ec59184b98a49ff6644ab117861901

module.exports = router;
