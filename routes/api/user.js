const express = require('express');
const router = express.Router();

const UserController = require('../../controllers/user');

router.post('/user/signup', UserController.userSignup);
router.post('/login', UserController.userLogin);
router.post('/logout', UserController.userLogout);

module.exports = router;
