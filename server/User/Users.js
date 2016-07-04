const mongoose = require('mongoose');

const Users = mongoose.Schema(
  {
      name: {type: String}
    , userType: {type: String}
    , bio: {type: String}
    , imageUrl: {type: String}
    , facebookID: {type: Number}
    , facebookName: {type: String}
    , zipCode: {type: Number}
    , servicesOffered: {}
  }
)

module.exports= mongoose.model('Users', Users);
