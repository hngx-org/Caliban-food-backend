const express = require('express');
require("dotenv").config()
const router = express.Router();
const jwt = require('jsonwebtoken')
const { signupUser} = require('../services/user');
const orgController = require('../../controllers/organization');
const authenticateToken = require('../../middleware/user');

router.put('/create/:orgId', authenticateToken, orgController.createOrUpdateOrg);


router.post("/staff/signup", orgController.staffSignup);


module.exports = router;
