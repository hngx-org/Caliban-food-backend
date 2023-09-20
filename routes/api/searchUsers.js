const express = require('express');
const router = express.Router();

const authMiddleware = require('../../middleware/user');

const { searchUsers } = require('../../controllers/searchUser');

router.get('/search', authMiddleware,searchUsers );

module.exports = router;
  