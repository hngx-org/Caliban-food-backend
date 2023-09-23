const signupStaff = require("../services/staff").signupStaff;
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const orgService = require("../services/organization");
const {User, Organization, Organization_lunch_wallet, Organization_invites } = require("../models");

const { string } = require("yargs");

const createOrganization = async (req, res) => {
  try {
    const { id } = req.user;
    const { is_admin } = await User.findOne({ where: { id: id } });
    if (!is_admin) {
      return res.status(400).json({
        message: "Unauthorised",
        statusCode: 400,
        data: null,
      });
    }
    const { organization_name, lunch_price = 1000 } = req.body;
    if (!organization_name) {
      return res.status(400).json({
        message: "No Organization name found",
        statusCode: 400,
        data: null,
      });
    }
    const orgExist = await Organization.findOne({
      where: {
        name: organization_name,
      },
    });
    if (orgExist) {
      return res.status(400).json({
        message: "Organiztion Name Already Exist",
        statusCode: 400,
        data: null,
      });
    }
    const newOrganization = await Organization.create({
      name: organization_name,
      lunch_price: lunch_price,
      currency_code: "₦",
    });

    await User.update({ org_id: newOrganization.id }, { where: { id: id } });

    //  create organization wallet
    await Organization_lunch_wallet.create({
      org_id: newOrganization.id,
      balance: lunch_price,
    });
    return res.status(200).json({
      message: `Organization Creation Successful`,
      statusCode: 200,
      data: newOrganization,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Organization Creation Failed: ${error?.message}`,
      statusCode: 500,
      data: null,
    });
  }
};

const staffSignup = async (req, res) => {
  //return  console.log(await User.findAll({where: {email: "Fuzzy245.in@gmail.com"}}))
  //const { email, password, otp_token, first_name, last_name, phone_number } =
      //req.body;
  //return console.log(`${phone_number} ${first_name} ${last_name}`)
  try {
    const { email, password, otp_token, first_name, last_name, phone_number } =
      req.body;
      

    if (!phone_number) {
      return res.status(400).json({ error: "missing phone number" });
    }
    if (!email) {
      return res.status(400).json({ error: "missing email" });
    }
    if (!otp_token) {
      return res.status(400).json({ error: "missing otp_token" });
    }
    if (!first_name) {
      return res.status(400).json({ error: "missing first_name" });
    }
    if (!last_name) {
      return res.status(400).json({ error: "missing last name" });
    }
    if (!password) {
      return res.status(400).json({ message: "missing password" });
    }

    const invite = await Organization_invites.findOne({where: {token: otp_token, email: email}})

    if (!invite){
      return res.status(401).json({
        message: "Unauthorised",
        statusCode: 401,
        data: null
      })
    } else if(invite.is_deleted) {
      return res.status(400).json({
        message: "Expired token",
        statusCode: 400,
        data: null
      })
    }
    const orgId = invite.org_id
    const user = await signupStaff({
      email,
      password,
      orgId,
      first_name,
      last_name,
      phone_number,
    });
    if (!user) return res.status(400).json({ error: "Email already in use" });

    const formattedUser = {
      id: user.id,
      email: user.email,
      org_id: user.org_id,
      first_name: user.first_name,
      last_name: user.last_name,
      phone_number: user.phone_number,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };
    await Organization_invites.update({is_deleted: true}, {where: {token: otp_token, email: email}})
    return res.status(201).json({ success: true, user: formattedUser });

  } catch (error) {
    return res.status(500).json({
      message: `Staff signUp Failed: ${error?.message}`,
      statusCode: 500,
      data: null,
    });
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
        message: "Invalid Amount",
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

const updateWalletBalance = async (req, res) => {
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

    const { amount } = req.body;
    if (!amount) {
      return res.status(400).json({
        message: "No amount given",
        statusCode: 400,
        data: null,
      });
    }
    if (typeof amount === "string") {
      return res.status(400).json({
        message: "Invalid Price",
        statusCode: 400,
        data: null,
      });
    }
    const checkOrg = await Organization_lunch_wallet.findOne({
      where: { org_id },
    });
    if (!checkOrg) {
      return res.status(400).json({
        message: "No Organization found",
        statusCode: 400,
        data: null,
      });
    }
    await Organization_lunch_wallet.update(
      { balance: amount },
      { where: { org_id } }
    );
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
  sendOrganizationInvite,
  staffSignup,
  updateLunchPrice,
  updateWalletBalance,
  createOrganization,
};
