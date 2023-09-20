const Organization = require('../services/organisation.js');

const createOrganization = async (req, res) => {
    try {
        //
        const orgData = req.body

        const newOrg = await Organization.createOrganization(orgData);

        return res.status(201).json({message: 'Organization created succesfully', organization: newOrg})
    } catch {
        console.error('Error creating organisation:', error);
        return res.status(500).json({message: 'Internal service error'});
    }
};

module.exports = {
    createOrganization,
};