const express = require("express");
const { route } = require("../app");
const { body } = require("express-validator");
const {
  sendOrganizationInvite,
} = require("../controllers/sendOrganizationInvite.controllers");

const sendInviteRoute = express.Router();

sendInviteRoute.post(
  "/api/organization/invite",
  [body("email").isEmail()],
  sendOrganizationInvite
);

module.exports = sendInviteRoute;
