const express = require('express');
const router = express.Router();

const authMiddleware = require('../../middleware/user');

const { createBank } = require('../../controllers/createBank');
const { getProfile } = require('../../controllers/getUserProfile');

router.get('/profile', authMiddleware, getProfile);
router.post('/bank', authMiddleware, createBank);

module.exports = router;
