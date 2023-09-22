const { token } = require("morgan");
const {

  Organization_invites,
  Organization,
  Organization_lunch_wallet,
} = require("../models");
const { generateToken, sendMail } = require("../utils/helpers");

const { User } = require("../models");
const organization_lunch_wallet = require("../models/organization_lunch_wallet");

// Create a new organization
async function createOrganization(organization_name, lunch_price = 1000, id) {
 const allOrg =  await organization_lunch_wallet.findAll()

//  console.log(allOrg)

  console.log(allOrg)
  return;
  try {
    const adminUser = await User.findByPk(id);

    if (!adminUser && adminUser.is_admin) {
      // Default lunch_price to 1000 if not provided
      throw new Error("Unauthaurize user you cannot create organization");
    }
    const orgExist = await Organization.findOne({
      where: {
        name: organization_name,
      },
    });
    if (orgExist?.name === organization_name) {
      await Organization.update(
        {
          name: organization_name,
          lunch_price: lunch_price,
          currency_code: orgExist.currency_code,
        },
        {
          where: {
            name: organization_name,
          },
        }
      );
      const org = await Organization.findOne({
        where: { name: organization_name },
      });
      return org;
    }
    const newOrganization = await Organization.create({
      name: organization_name,
      lunch_price: lunch_price,
      user: id,
      currency_code: "₦",
    });

    await User.update({ org_id: newOrganization.id }, { where: { id: id } });
 
//  create organization wallet
    const orgWallet = await Organization_lunch_wallet.create({
      org_id: newOrganization.id,
      balance: lunch_price,
    });

      console.log(orgWallet)

    return newOrganization;
  } catch (error) {
    console.log(error)
    throw new Error("Error creating organization");
  }
}

// Update an existing organization
// const updateOrganization = async (orgId, updatedData) => {
//   try {
//     const updatedOrganization = await Organization.findByPk(orgId);

//     if (!updatedOrganization) {
//       throw new Error("Organization not found");
//     }

//     // Update the organization properties as needed
//     if (updatedData.organization_name) {
//       updatedOrganization.name = updatedData.organization_name;
//     }
//     if (updatedData.lunch_price) {
//       updatedOrganization.lunch_price = updatedData.lunch_price;
//     }

//     await updatedOrganization.save();

//     return updatedOrganization;
//   } catch (error) {
//     throw new Error("Error updating organization");
//   }
// };

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
  // updateOrganization, // Export the new service function for updating organizations
};
