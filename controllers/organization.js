const { validationResult } = require("express-validator");
const orgService = require("../services/organization");

const createOrUpdateOrg = async (req, res) => {
  const { id } = req.user;
  try {
    const { organization_name, lunch_price } = req.body;

    const organization = await orgService.createOrganization(
      organization_name,
      lunch_price,
      id
    );

    return res.status(201).json({
      message: "Organization created or updated successfully",
      organization,
    });

    //check if orgId is provided (indicating an update) if not (indicate creation)
    // const orgId = req.params.orgId; //Assuming if orgId is passed in the url

    // if (orgId) {
    //   //if orgId is provided it is treated as creation
    //   const updateOrg = await orgService.updateOrganization(id, {
    //     organization_name,
    //     lunch_price,
    //   });

    //   return res.status(200).json({
    //     message: "Organization created or updated successfully",
    //     updateOrg,
    //   });
    // } else {
    //   //if orgId is not provided it is treated as creation
    //   const createOrg = await orgService.createOrganization({
    //     organization_name,
    //     lunch_price,
    //   });

    //   return res.status(201).json({
    //     message: "Organization created or updated successfully",
    //     createOrg,
    //   });
    // }
  } catch (err) {
    console.log("Error creating or updating organization", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const sendOrganizationInvite = async (req, res) => {
  const errors = validationResult(req.body);
  if (!errors.isEmpty()) {
    throw new Error("invalid input");
  }
  try {
    const { email } = req.body;
    const { id } = req.user;

    await orgService.createOrganizationInvite(email, id);
    return res.status(200).json({
      message: "success",
      statusCode: 200,
      data: null,
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = {
  createOrUpdateOrg,
  sendOrganizationInvite,
};
