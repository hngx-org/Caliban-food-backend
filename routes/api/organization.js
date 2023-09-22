const express = require('express');
const router = express.Router();

const {createOrUpdateOrg,sendOrganizationInvite, updateLunchPrice} = require('../../controllers/organization');
const authenticateToken = require('../../middleware/user');
const { body } = require('express-validator');

router.put('/create/:orgId', authenticateToken, createOrUpdateOrg);
router.post("/invite",[body("email").isEmail().isEmpty()], authenticateToken, sendOrganizationInvite);
router.patch("/lunch/update", authenticateToken, updateLunchPrice );
module.exports = router;
