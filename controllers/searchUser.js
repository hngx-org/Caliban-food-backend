const { User } = require("../models");
const {Op} = require("sequelize")

const searchUsers = async (req, res) => {
  try {
    const { query } = req.query; // Assuming the search query is passed as a parameter

    if (!query) {
      return res.status(400).json({
        message: "Please provide a search query (last_name, first_name, or email).",
      });
    } 

    const users = await User.findAll({
      where: {
        [Op.or]: [
          {
            last_name: {
              [Op.like]: `%${query}%`,
            },
          },
          {
            first_name: {
              [Op.like]: `%${query}%`,
            },
          },
          {
            email: {
              [Op.like]: `%${query}%`,
            },
          },
        ],
      },
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

    if (!users || users.length === 0) {
      return res.status(404).json({
        message: "No users found matching the search query.",
      });
    }

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
  searchUsers,
};