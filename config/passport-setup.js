const passport = require('passport');
const dotenv = require('dotenv')
const GoogleStrategy = require('passport-google-oauth20');
dotenv.config()

passport.use(
  new GoogleStrategy({
	  callbackURL: process.env['serverHost'] + '/api/v1/redirect',
    clientID: process.env['clientID'],
    clientSecret: process.env['clientSecret']
  },
  (accessToken, refreshToken, profile, done)=>{
    // logiuc for signing up users goes here
    // profile is an object with user details
	  console.log(profile)
	  done()
  }
))
