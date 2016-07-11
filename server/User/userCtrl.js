const Users = require("./Users")

module.exports = {

    getUserFacebook (req, res, next) {
      const userObject= {
        facebookID: req.user.id
      , facebookName: req.user.displayName
      , email: req.user.email
      , username: req.user.username
      , picture: req.user.photos
      , firstName: req.user.name.givenName
      , lastName: req.user.name.familyName
      , gender: req.user.gender
      , birthday: req.user.birthday
      , location: req.user.location
       }
      // Users.findOne({facebookID: userObject.facebookID}, function (err, user){
      //   if(!user) {return res.json(userObject)};
      //     req.session.user = user;
      //     return res.json(user);
      // })
      Users.findOne({facebookID: userObject.facebookID})
      .populate('servicesOffered')
      .populate('reviews')
      .exec( (err, user) => {
        if (!user) {return res.json(userObject)};
        return res.status(200).json(user);
      })
    },
      //GET REQUEST

  getUsers (req, res, next) {
    Users.find( (req.query), (err,users) => {
      if (err) {return res.send(err); }
      return res.json(users);
      })
    },
  getThisUser (req, res, next) {
      Users.findById( req.params.id )
      .populate('reviews')
      .populate('servicesOffered')
      .exec( (err, user) => {
        if (err) {return res.status(500).json(err); }
        return res.status(200).json(user);
      })
  },


  //POST REQUEST
  addUser (req, res, next) {
    new Users(req.body).save( (err, user) => {
      if (err) {return res.send(err); }
      req.session.user = user;
      return res.json(user);
    })
  },
  addLocation (req, res, next) {
    if (!req.params.id) {return res.status(400).send("Not in User")};
    Users.findByIdAndUpdate(req.params.id, {$push: {savedLocations: req.body}}, {safe: true, upsert:true}, (err, user) => {
      if (err) { return res.send(err); }
      return res.json(user);
    })
  },

  //PUT REQUEST
  editUser (req, res, next) {
    if (!req.params.id) {return res.status(400).send("Not in User")};
    Users.findByIdAndUpdate(req.params.id, req.body, (err, response) => {
      if (err) { return res.send(err); }
      else {return res.json(response); }
    })
  },

  //DELETE REQUEST
  deleteUser (req, res, next) {
    if (!req.params.id) {return res.status(400).send("Find User To Delete")};
    Users.findByIdAndRemove(req.params.id, req.body, (err, response) => {
      if (err) { return res.send(err); }
      else {return res.json(response); }
    })
  },

  //logout

    logOut( req, res, next ) {
    req.session.destroy();
    req.logout();
    res.redirect('/');
  },
    isLoggedIn(req, res, next) {
      if ( req.isAuthenticated() ) {
        console.log(req.isAuthenticated());
        return next();
      }
      res.status(401);
  },


}
