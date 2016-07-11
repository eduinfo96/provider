const mongoose = require('mongoose');

const Reviews = mongoose.Schema(
  {
    serviceType: {type: String}
  , skillLevel: {type: Number}
  , description: {type: String}
  , flatRate: {type: Object}
  , hrlyRate: {type: Object}
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
  , travelDistance: {type: Number}
}
)

module.exports= mongoose.model('Reviews', Reviews);
