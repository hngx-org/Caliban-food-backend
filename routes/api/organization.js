const express = require('express');
const router = express.Router();
const orgController = require('../../controllers/organization');

//create a new organization

router.post('/create', orgController.createOrganization)


module.exports = router