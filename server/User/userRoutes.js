const FacebookAuth = require ("./FacebookAuth");
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

module.exports = app => {
  app.get('/auth/facebook', passport.authenticate('facebook'));
  app.get('/auth/facebook/callback', passport.authenticate('facebook', {
      successRedirect: "/me"
    , failureRedirect: "/#/home"
  }), (req, res) => {
    console.log(req.session);
  })

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((obj, done) => {
    done(null, obj);
  });
  //the start of the actually getting the user data// now we can create the user Schema
  app.get('/me',FacebookAuth.getUserFacebook);
}
