const express = require('express');
const router = express.Router();

const {createOrUpdateOrg,sendOrganizationInvite, updateLunchPrice, updateWalletBalance} = require('../../controllers/organization');
const authenticateToken = require('../../middleware/user');
const { body } = require('express-validator');

router.put('/create', authenticateToken, createOrUpdateOrg);
router.post("/invite",[body("email").isEmail().isEmpty()], authenticateToken, sendOrganizationInvite);
router.patch("/lunch/update", authenticateToken, updateLunchPrice );
router.patch("/wallet/update", authenticateToken, updateWalletBalance);

module.exports = router;
