const { User } = require('../models');

const getProfile = async (req, res) => {
  const { id } = req.user;

  try {
    const user = await User.findByPk(id, {
      attributes: {
        exclude: [
          'id',
          'password_hash',
          'refresh_token',
          'created_at',
          'updated_at',
        ],
      },
    });
    if (!user) {
      return res.status(401).json({
        message: 'User not authorized',
      });
    }
    return res.json({
      message: 'User data fetched successfully',
      statusCode: 200,
      data: user,
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { getProfile };