const dotenv  = require('dotenv');
dotenv.config()
const jwt  = require("jsonwebtoken")
async function generateToken(payload) {
    const token = jwt.sign(
      {
        email: payload,
      },
      `${process.env.INVITE_SECRETE}`,
      { expiresIn: "30d" }
    );
    return token;
}

async function decodeToken(token) {
 const  decode = jwt.verify(
      token ,
      `${process.env.INVITE_SECRETE}`,
    );

    return decode
}

// function to  send mail from nodemailer server



module.exports = {generateToken, decodeToken}
