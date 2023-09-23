const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
dotenv.config();
const crypto = require('crypto');
// const secretKeyHex = process.env.SECRET_CRYPTO_KEY
// const secretKey = Buffer.from(secretKeyHex, 'hex');
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
  let mailTransporter =  nodemailer.createTransport({
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
    <a href="${process.env.BASE_URL}/organization/staff/signup">Sign Up Here.</a><br>
    <p>with this Token : ${token}</p>`,
  };

  mailTransporter.sendMail(maiDetails, function (err, data) {
    if (err) {
      console.log("Error occured");
    } else {
      console.log("Email sent successfully");
    }
  });
}




async function generateEncryptedOTP() {
  let bytes = crypto.randomBytes(32)
  let text = bytes.toString("hex")
  return (text.substring(0, 6));
}


generateEncryptedOTP()

module.exports = { generateToken, decodeToken, sendMail,  generateEncryptedOTP};
