const { Organization } = require('../models');

// Create a new organization
const createOrganization = async (organizationData) => {
  try {
    const { organization_name, lunch_price } = organizationData;

    // Default lunch_price to 1000 if not provided
    const newOrganization = await Organization.create({
      name: organization_name,
      lunch_price: lunch_price || 1000,
    });

    return newOrganization;
  } catch (error) {
    throw new Error('Error creating organization');
  }
};

module.exports = {
  createOrganization,
};
