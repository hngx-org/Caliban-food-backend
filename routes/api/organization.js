const express = require('express');
const router = express.Router();

const orgController = require('../../controllers/organization');
const authenticateToken = require('../../middleware/user');

router.put('/create/:orgId', authenticateToken, orgController.createOrUpdateOrg);


module.exports = router;
