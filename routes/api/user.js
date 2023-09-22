const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/user');

const UserController = require('../../controllers/user');

router.post('/signup', UserController.userSignup);
router.post('/login', UserController.userLogin);

module.exports = router;
