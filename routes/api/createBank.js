const express = require('express');
const router = express.Router();

const authMiddleware = require('../../middleware/user');

const { createBank } = require('../../controllers/createBank');

router.post('/bank', authMiddleware, createBank);

module.exports = router;
