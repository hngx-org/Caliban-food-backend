const express = require("express");
const router = express.Router();
const passport = require("passport");
const passportSetup = require('../../config/passport-setup')
const UserController = require("../../controllers/user")


router.get("/signup", passport.authenticate("google", {scope: ['profile', 'email']}));
router.get('/redirect', passport.authenticate('google'), (req, res)=>{})
module.exports = router;
