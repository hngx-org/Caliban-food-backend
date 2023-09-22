const { validationResult } = require("express-validator");
const orgService = require("../services/organization");
const { Organization } = require("../models");
const { User } = require("../models");
const { string } = require("yargs");

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
const updateLunchPrice = async (req, res) => {
  try {
    const { id } = req.user;
    const { org_id, is_admin } = await User.findOne({ where: { id: id } });
    if (!is_admin) {
      return res.status(400).json({
        message: "Unauthorised",
        statusCode: 400,
        data: null,
      });
    }
    const { lunch_price } = req.body;
    if (typeof lunch_price === string) {
      return res.status(400).json({
        message: "Invalid Price",
        statusCode: 400,
        data: null,
      });
    }
    const checkOrg = await Organization.findOne({ where: { id: org_id } });
    if (!checkOrg) {
      return res.status(200).json({
        message: "No Organization found",
        statusCode: 400,
        data: null,
      });
    }
    await Organization.update({ lunch_price }, { where: { id: org_id } });
    return res.status(200).json({
      message: "success",
      statusCode: 200,
      data: null,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Lunch Price Update Failed: ${error?.message}`,
      statusCode: 500,
      data: null,
    });
  }
};
module.exports = {
  createOrUpdateOrg,
  sendOrganizationInvite,
  updateLunchPrice,
};
