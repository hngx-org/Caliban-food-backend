const { token } = require("morgan");
const { Organization, Organization_invites } = require("../models");
const { generateToken, sendMail } = require("../utils/helpers");

const { User } = require("../models");

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
    throw new Error("Error creating organization");
  }
};

// Update an existing organization
const updateOrganization = async (orgId, updatedData) => {
  try {
    const updatedOrganization = await Organization.findByPk(orgId);

    if (!updatedOrganization) {
      throw new Error("Organization not found");
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
    throw new Error("Error updating organization");
  }
};

const createOrganizationInvite = async (email, orgUserId) => {
  const token = await generateToken(email);
  
  const isAdmin = await User.findByPk(orgUserId);
  
  // check if that user sending the email is an admin or not
  
  if (!isAdmin.is_admin) {
    throw new Error("Unauthorized user");
  }
  // user can only send email invite when he is an admin else it throws an error

  // add function to send email from the helper file and also attached the generated token to your email
  await sendMail(email, token);
  try {
    const newOrganizationInvite = await Organization_invites.create({
      email: email,
      token: token,
      is_deleted: false,
      org_id: isAdmin.org_id,
      ttl: new Date(),
    });

    return newOrganizationInvite;
  } catch (error) {
    throw new Error("Error creating organization invite");
  }
};

module.exports = {
  createOrganizationInvite,
  createOrganization,
  updateOrganization, // Export the new service function for updating organizations
};
