const mongoose = require('mongoose');

const Messages = mongoose.Schema(
  {
    messageType: {type: String}
  , requestDate: {type: Object}
  , subject: {type: String}
  , sentTime: {type: Object}
  , content: {type: String}
  , status: {type: String, default:"Unapproved"}
  , read: {type: Boolean, default: false}
  , serviceRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: `Services`
  }
  , to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: `Users`
   }
  , from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: `Users`
    }
}
)

module.exports= mongoose.model('Messages', Messages);
