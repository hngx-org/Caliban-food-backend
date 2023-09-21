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

// Update an existing organization
const updateOrganization = async (orgId, updatedData) => {
  try {
    const updatedOrganization = await Organization.findByPk(orgId);

    if (!updatedOrganization) {
      throw new Error('Organization not found');
    }

    // Update the organization properties as needed
    if (updatedData.organization_name) {
      updatedOrganization.name = updatedData.organization_name;
    }
    if (updatedData.lunch_price) {
      updatedOrganization.lunch_price = updatedData.lunch_price;
    }

    await updatedOrganization.save();

    return updatedOrganization;
  } catch (error) {
    throw new Error('Error updating organization');
  }
};

module.exports = {
  createOrganization,
  updateOrganization, // Export the new service function for updating organizations
};
