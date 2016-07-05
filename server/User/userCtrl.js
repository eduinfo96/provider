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
      res.json(userObject);
    },
      //GET REQUEST

  getUsers (req, res, next) {
    Users.find( (req.query), (err,users) => {
      if (err) {return res.send(err); }
      return res.json(users);
      })
    },
  getThisUser (req, res, next) {
      Users.findById( req.params.id, (err, user) => {
      if (err) { return res.send(err); }
      return res.json(user);
    })
  },



  //POST REQUEST
  addUser (req, res, next) {
    new Users(req.body).save( (err, user) => {
      if (err) {return res.send(err); }
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


}
