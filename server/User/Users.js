const mongoose = require('mongoose');

const Users = mongoose.Schema(
  {
    name: {type: String}
  , userType: {type: String}
  , bio: {type: String}
  , imageUrl: {type: String}
  , facebookID: {type: Number, required:true}
  , facebookName: {type: String}
  , facebookFirstName: {type: String}
  , facebookLastName: {type: String}
  , zipCode: {type: Number}
  , email: {type: String}
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
