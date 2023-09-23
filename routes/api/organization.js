const express = require('express');
require("dotenv").config()
const router = express.Router();

const { signupUser} = require('../../services/user');
const jwt = require('jsonwebtoken')
const {createOrganization,sendOrganizationInvite, updateLunchPrice, updateWalletBalance, staffSignup} = require('../../controllers/organization');
const authenticateToken = require('../../middleware/user');
const { body } = require('express-validator');

router.post("/staff/signup", staffSignup);
router.put('/create', authenticateToken, createOrganization);
router.post("/invite",[body("email").isEmail().isEmpty()], authenticateToken, sendOrganizationInvite);
router.patch("/lunch/update", authenticateToken, updateLunchPrice );
router.patch("/wallet/update", authenticateToken, updateWalletBalance);


module.exports = router;
