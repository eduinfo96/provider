const userRoutes = require ('./User/userRoutes');
module.exports = app => {
  userRoutes(app);
}
