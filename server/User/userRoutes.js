const FacebookAuth = require ("./FacebookAuth");

module.exports = app => {
  app.get('/auth/facebook', FacebookAuth.takeToFb)
}
