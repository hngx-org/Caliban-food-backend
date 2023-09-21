const { User } = require('../models');

const createBank = async (req, res) => {
  const { bank_name, bank_code, bank_number } = req.body;

  const { id } = req.user;

  try {
    const user = await User.findByPk(id);

    user.bank_name = bank_name;
    user.bank_code = bank_code;
    user.bank_number = bank_number;

    await user.save();
    return res.json({
      message: 'successfully created Bank',
      statusCode: 200,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createBank };