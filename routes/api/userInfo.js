const express = require('express');
const router = express.Router();

const authMiddleware = require('../../middleware/user');

const { createBank } = require('../../controllers/createBank');
const { getProfile } = require('../../controllers/getUserProfile');
const { redeemLunch } = require('../../controllers/user');

router.get('/profile', authMiddleware, getProfile);
router.post('/bank', authMiddleware, createBank);

// aNEW ROUTES FOR REDEEMING LUNCH WHEN AN ARRAY OF IDS IS PASSED
router.post('/redeem', authMiddleware, redeemLunch);

module.exports = router;
