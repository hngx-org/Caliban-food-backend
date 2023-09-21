const express = require('express');
const router = express.Router();

const authMiddleware = require('../../middleware/user');

const { getAllUsers } = require('../../controllers/getAllUsers');

router.get('/', authMiddleware, getAllUsers);

module.exports = router;
