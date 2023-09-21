const { signupUser, loginUser } = require("../services/user");

// Controller function for user signup
async function userSignup(req, res, next) {
  try {
    const { email, password, orgId, firstName, lastName } = req.body;

    // Call the signupUser service function
    const { user, token } = await signupUser({
      email,
      password,
      orgId,
      firstName,
      lastName,
    });

      const formattedUser = {
        id: user.id,
        email: user.email,
        password_hash: user.password_hash,
        org_id: user.org_id,
        first_name: user.first_name,
        last_name: user.last_name,
        created_at: user.created_at,
        updated_at: user.updated_at,
      };
      
    res.status(201).json({ success: true, user: formattedUser, token });
  } catch (error) {
    next(error);
  }
}


// Controller function for user login
async function userLogin(req, res, next) {
  try {
    const { email, password } = req.body;

    // Call the loginUser service function
    const { user, token } = await loginUser({ email, password });

    // Return a success response with user data and JWT token
    res.status(200).json({ success: true, user, token });
  } catch (error) {
    // Handle any errors that occurred during login
    next(error);
  }
}

module.exports = {
  userSignup,
  userLogin,
};
