const express = require('express');
const router = express.Router();

const authMiddleware = require('../../middleware/user');

const { searchUser } = require('../../controllers/searchUsers');

router.get('/', authMiddleware, searchUser);

module.exports = router;
