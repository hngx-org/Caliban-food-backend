const { Organization_invites } = require("../models");
const { sendMail, generateEncryptedOTP} = require("../utils/helpers");

const { User } = require("../models");

const createOrganizationInvite = async (email, orgId) => { 
  const getOTP = await generateEncryptedOTP()
  const isAdmin = await User.findByPk(orgId);
  if (!isAdmin.is_admin) {
    throw new Error("Unauthorized user");
  }
  try {
    await sendMail(email, getOTP);
    const newOrganizationInvite = await Organization_invites.create({
      email: email,
      token: getOTP,
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
};
