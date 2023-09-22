const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
dotenv.config();
const jwt = require("jsonwebtoken");
async function generateToken(payload) {
  const token = jwt.sign(
    {
      email: payload,
    },
    `${process.env.JWT_SECRET}`,
    { expiresIn: process.env.JWT_EXPIRE }
  );
  return token;
}

async function decodeToken(token) {
  const decode = jwt.verify(token, `${process.env.INVITE_SECRETE}`);

  return decode;
}
async function sendMail(email, token) {
  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  let maiDetails = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Organization Invite",
    text: "Official Invitation to join the organization",
    html: `<p>Official Invitation to join the organization</p>
    <a href="https://meet.google.com/dae-hhbs-urx?token=${token}">Organization Link</a>`,
  };

  mailTransporter.sendMail(maiDetails, function (err, data) {
    if (err) {
      console.log("Error Occurs");
    } else {
      console.log("Email sent successfully", data);
    }
  });
}

module.exports = { generateToken, decodeToken, sendMail };
