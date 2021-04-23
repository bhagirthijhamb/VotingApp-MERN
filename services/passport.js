const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy; 
const keys = require('./../config/keys');
// const mongoose = require('mongoose');
// const User = require('./../models/User');
// const User = mongoose.model('User');

const db = require('./../models');

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  db.User.findById(id).then(user => {
    done(null, user)
  })
})

passport.use(
  new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/api/auth/google/callback' 
  }, (accessToken, refreshToken, profile, done) => {
    console.log('accessToken' ,accessToken);
    console.log('profile', profile);
    // with Promises
    db.User.findOne({ googleId: profile.id })
      .then(existingUser => {
        if(existingUser){
          // we already have a user
          done(null, existingUser)
        } else {
          // we do not have user, so create one
          new db.User({ googleId: profile.id, username: profile.displayName })
            .save()
            .then(user => done(null, user))
        }
      })
  })
);