module.exports = {
  getUserFacebook (req, res, next) {
    const userObject= {
        id: req.user.id
      , facebookName: req.user.displayName
    }
    res.send(userObject);
  }


}
