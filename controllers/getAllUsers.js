const { User } = require("../models");

const getAllUsers = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({
      message: "User not authorized",
    });
  }

  try {
    const users = await User.findAll({
      attributes: {
        exclude: [
          "phone",
          "is_admin",
          "bank_number",
          "bank_code",
          "bank_name",
          "password_hash",
          "refresh_token",
          "created_at",
          "updated_at",
        ],
      },
    });

    return res.json({
      message: "success",
      statusCode: 200,
      data: users,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  getAllUsers,
};
