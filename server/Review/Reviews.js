const mongoose = require('mongoose');

const Reviews = mongoose.Schema(
  {
    serviceType: {type: String}
  , skillLevel: {type: Number}
  , comment: {type: String}
  , cost: {type: Object}
  , postedOn: {type: String}
  , forUser: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: `Users`
   }]
  , byUser: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: `Users`
    }]
   , service: [{
       type: mongoose.Schema.Types.ObjectId,
       ref: `Services`
    }]
}
)

module.exports= mongoose.model('Reviews', Reviews);
