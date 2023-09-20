const bcrypt = require("bcryptjs");
const { User } = require("../models");

async function signupUser({ email, password, orgId, firstName, lastName }) {
  try {
    // Check if the user with the same email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error("Email is already in use");
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
    });

    // Generate a JWT for authentication
    const token = newUser.getSignedToken(newUser);

    return { user: newUser, token };
  } catch (error) {
    throw error;
  }
}

async function loginUser({ email, password }) {
  try {
    // Check if the user with the provided email exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error("Invalid email or password");
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      throw new Error("Invalid email or password");
    }

    // Generate a JWT for authentication
    const token = user.getSignedToken(user);

    return { user, token };
  } catch (error) {
    throw error;
  }
}

module.exports = {
  signupUser,
  loginUser,
};
