const reviewCtrl = require('./reviewCtrl')

module.exports = app => {
//GET REQUEST
  app.get('/api/reviews', reviewCtrl.getReviews);
  app.get('/api/reviews/:id', reviewCtrl.getThisReview);
//APP POST
  app.post('/api/reviews', reviewCtrl.addReview);
//APP.PUT
  app.put('/api/reviews/:id', reviewCtrl.editReview);
//DELETE REQUEST
  app.delete('/api/reviews/:id', reviewCtrl.deleteReview);
}
