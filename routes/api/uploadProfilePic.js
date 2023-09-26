const uploadProfilePicture = require("../../controllers/uploadProfilePic")
const router = require('express').Router()
const authMiddleware = require('../../middleware/user');
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "lunchApp",
    allowed_formats: ['jpg', 'png'] 
  },
});

const upload = multer({ storage: storage });

router.post("/upload",[authMiddleware,
upload.single("image")],
 uploadProfilePicture);

module.exports = router
