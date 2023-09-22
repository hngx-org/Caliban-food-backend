const upload = require("../../config/cloudinaryConfig")
const uploadPicture = require("../../controllers/uploadProfilePic")
const router = require('express').Router
const authMiddleware = require('../../middleware/user');

router.post("/upload", [upload.single("image"), authMiddleware], uploadProfilePicture);

module.exports = router
