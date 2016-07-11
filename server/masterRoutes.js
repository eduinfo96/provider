const userRoutes = require ('./User/userRoutes');
const serviceRoutes = require ('./Service/serviceRoutes');
const reviewRoutes = require ('./Review/reviewRoutes');

module.exports = app => {
  userRoutes(app);
  serviceRoutes(app);
  reviewRoutes(app);
}
