const dotenv = require("dotenv");
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


module.exports = { generateToken, decodeToken };
