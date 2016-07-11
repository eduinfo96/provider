const mongoose = require('mongoose');

const Services = mongoose.Schema(
  {
    serviceType: {type: String}
  , skillLevel: {type: Number}
  , description: {type: String}
  , flatRate: {type: Object}
  , specialties: {type: String}
  , hrlyRate: {type: Object}
  , status: {type: Object, default: 'notActive'}
  , user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: `Users`
   }
   , reviews: [{
       type: mongoose.Schema.Types.ObjectId,
       ref: `Reviews`
    }]
  , travelDistance: {type: Number}
}
)

module.exports= mongoose.model('Services', Services);
