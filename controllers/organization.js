const createOrgService = require('../services/organization');

//create a new organization
const createOrg = async (req, res) => {
    try {
        const orgData = req.body;

        const newOrg = await createOrgService.createOrganization(orgData);

        return res.status(201).json({message: 'created organization succesfully', organization: newOrg});
    } catch (err) {
        console.error('Error creating organization:', err);

        return res.status(500).json({message: 'Internal server error'});
    }
};

module.exports = {
    createOrg,
}