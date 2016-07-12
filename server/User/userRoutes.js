const userCtrl = require ("./userCtrl");
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

module.exports = app => {
  app.get('/auth/facebook', passport.authenticate('facebook'));
  app.get('/auth/facebook/callback', passport.authenticate('facebook', {
      successRedirect: "/#/profile"
    , failureRedirect: "/#/home"
  }), (req, res) => {
    console.log(res)
    console.log(req);
  })

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((obj, done) => {
    done(null, obj);
  });
  //the start of the actually getting the user data// now we can create the user Schema
  app.get('/FBuser', userCtrl.isLoggedIn,userCtrl.getUserFacebook);

  app.get('/api/users',userCtrl.isLoggedIn, userCtrl.getUsers);

  app.get('/api/users/:id',userCtrl.isLoggedIn, userCtrl.getThisUser);

  app.post('/api/users',userCtrl.isLoggedIn, userCtrl.addUser);

  app.put('/api/users/:id/locations',userCtrl.isLoggedIn, userCtrl.addLocation);
  app.put('/api/users/:id',userCtrl.isLoggedIn, userCtrl.editUser);

  app.delete('/api/users/:id',userCtrl.isLoggedIn, userCtrl.deleteUser);

  app.get('/logout', userCtrl.logOut);


}
