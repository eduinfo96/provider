const userCtrl = require ("./userCtrl");
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

module.exports = app => {
  app.get('/auth/facebook', passport.authenticate('facebook'));
  app.get('/auth/facebook/callback', passport.authenticate('facebook', {
      successRedirect: "/#/profile"
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


  app.get('/api/users', userCtrl.getUsers);
  app.get('/api/users/:id', userCtrl.getThisUser);

  app.post('/api/users', userCtrl.addUser);

  app.put('/api/users/:id', userCtrl.editUser);

  app.delete('/api/users/:id', userCtrl.deleteUser);


}
