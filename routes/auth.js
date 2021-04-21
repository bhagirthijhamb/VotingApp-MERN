const router = require('express').Router();
const handle = require('./../handlers');
const passport = require('passport');

router.post('/register', handle.register);
router.post('/login');

router.get('/google', passport.authenticate('google', {
    scope: [ 'profile', 'email' ]
  }))

router.get('/google/callback', passport.authenticate('google'))


// module.exports = (app) => {
//   app.get('/google', passport.authenticate('google', {
//     scope: [ 'profile', 'email' ]
//   }))
  
//   app.get('/auth/google/callback', passport.authenticate('google'))
// }

module.exports = router;