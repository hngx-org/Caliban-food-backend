const { token } = require("morgan");
const { Organization_invites } = require("../models");
const { generateToken, sendMail } = require("../utils/helpers");

const { User } = require("../models");

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
      //org_id: isAdmin.org_id,
      ttl: new Date(),
    });

    return newOrganizationInvite;
  } catch (error) {
    throw new Error("Error creating organization invite");
  }
};

module.exports = {
  createOrganizationInvite,
  // updateOrganization, // Export the new service function for updating organizations
};
