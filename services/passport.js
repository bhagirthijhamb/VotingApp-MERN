const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy; 
const keys = require('./../config/keys');
// const mongoose = require('mongoose');
const User = require('./../models/User');
// const User = mongoose.model('User');

// const db = require('./../models');

passport.use(
  new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/api/auth/google/callback' 
  }, (accessToken, refreshToken, profile, done) => {
    console.log('accessToken' ,accessToken);
    console.log('profile', profile);
    new User({ googleId: profile.id, username: profile.displayName }).save();
  })
);