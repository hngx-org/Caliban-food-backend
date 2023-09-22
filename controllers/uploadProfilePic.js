const { User } = require('../models');

const uploadPicture = async (req, res)=>{
  const { id } = req.user;
  try {
    const user = await User.findByPk(id);
    console.log(req.file)
    user.profile_picture = req.file.path
    await user.save();
    return res.json({
      message: 'successfully uploaded profile picture',
      statusCode: 200
    });
  } catch (error) {
	  res.status(500).json({ message: error.message });
  }
};

module.exports = uploadPicture;
