const { validationResult } = require("express-validator");
const Organizationinvite = require("../models/OrganizationInvites");
const { generateToken, decodeToken } = require("../utils/helpers");

async function sendOrganizationInvite(req, res, next) {
  const errors = validationResult(req.body);
  if (!errors.isEmpty()) {
    throw new Error("Invalid input");
  }
  try {
    const { email } = req.body;
    // generte the token to be sent to the user invite mail

    const token = await generateToken(email);

    // add function to send the generated token to the user

    // function to decode the token
    // const decode =await  decodeToken(token);

    const invite = await Organizationinvite.create({
      email: email,
      token: token,
      org_id: 1,
      is_deleted: false,
      TTL: new Date(),
    });

    if (!invite) {
      throw new Error("Error inserting data into the database");
    }
    return res.status(200).json({
      message: "success",
      statusCode: 200,
      data: null,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports = {
  sendOrganizationInvite,
};
