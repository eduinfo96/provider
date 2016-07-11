const Reviews = require("./Reviews")

module.exports = {
  getReviews (req, res, next) {
    Reviews.find( (req.query), (err,reviews) => {
      if (err) {return res.send(err); }
      return res.json(reviews);
      })
    },
  getThisReview (req, res, next) {
      Reviews.findById( req.params.id, (err, review) => {
      if (err) { return res.send(err); }
      return res.json(review);
    })
  },

  //POST REQUEST
  addReview (req, res, next) {
    new Reviews(req.body).save( (err, review) => {
      if (err) {return res.send(err); }
      return res.json(review);
    })
  },



  //PUT REQUEST
  editReview (req, res, next) {
    if (!req.params.id) {return res.status(400).send("Not in User")};
    Reviews.findByIdAndUpdate(req.params.id, req.body, (err, response) => {
      if (err) { return res.send(err); }
      else {return res.json(response); }
    })
  },

  //DELETE REQUEST
  deleteReview (req, res, next) {
    if (!req.params.id) {return res.status(400).send("Find User To Delete")};
    Reviews.findByIdAndRemove(req.params.id, req.body, (err, response) => {
      if (err) { return res.send(err); }
      else {return res.json(response); }
    })
  }


}
