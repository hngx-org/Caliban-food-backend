const express = require('express');
const router = express.Router;

const OrgController = require('../../controllers/organization');

//create a new organization method: POST
router.post('/create', OrgController.createOrg);

module.exports = router;