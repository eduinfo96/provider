const mongoose = require('mongoose');

const Users = mongoose.Schema(
  {
    userType: {type: String}
  , facebookID: {type: Number, required:true}
  , facebookName: {type: String}
  , photos: {type: Object}
  , location: {type: String}
  , birthday: {type: String}
  , firstName: {type: String}
  , gender: {type: String}
  , lastName: {type: String}
  , zipCode: {type: Number}
  , email: {type: String}
  , bio: {type: String}
  , servicesOffered: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: `ServicesOffered`
   }]
  , reviews: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: `Reviews`
   }]
}
)

module.exports= mongoose.model('Users', Users);
