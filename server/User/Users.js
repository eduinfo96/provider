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
  , email: {type: String}
  , bio: {type: String}
  , servicesOffered: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: `Services`
   }]
  , reviews: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: `Reviews`
   }]
 , messages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: `Messages`
    }]
  , isAdmin: {type: Boolean, default: false}
  , cellNumber: {type: Number}
  , currentLocation: {type: Object}
  , savedLocations: []
  , isActive: {type: Boolean, default: false}
}
)

module.exports= mongoose.model('Users', Users);
