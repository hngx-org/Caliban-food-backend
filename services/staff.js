const bcrypt = require("bcryptjs");
const { User } = require("../models");

async function signupStaff({ email, password, orgId, firstName, lastName, phoneNumber }) {
  try {
    // Check if the user with the same email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return false
    }

    // Hash the password before storing it in the database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user record
    const newUser = await User.create({
      email,
      password_hash: hashedPassword,
      org_id: orgId,
      first_name: firstName,
      last_name: lastName,
      phone: phoneNumber
    });

    return newUser;
  } catch (error) {
    throw error;
  }
}


module.exports = {
  signupStaff
};
