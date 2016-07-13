const Messages = require('./Messages')
const Users = require('../User/Users')

module.exports = {
//GET REQUEST
  getMessages (req, res, next) {
    Messages.find( (req.query) )
      .populate('serviceRef')
      .populate('to')
      .populate('from')
      .exec( (err,messages) => {
        if (err) {return res.status(500).json(err); }
        return res.status(200).json(messages);
      })
    },
  getThisMessage (req, res, next) {
    Messages.findById(req.params.id)
      .populate('serviceRef')
      .populate('to')
      .populate('from')
      .exec( (err,messages) => {
        if (err) {return res.status(500).json(err); }
        return res.status(200).json(messages);
      })
  },
  //POST REQUEST
  sendMessage(req, res, next) {
    new Messages(req.body).save( (err, message) => {
      if (err) {return res.status(500).json(err)};
      Users.findByIdAndUpdate(req.body.to, {$push: {messages: message._id}}, {safe: true, upsert:true, new:true}, (err, user) => {
        if (err) { return res.status(500).json(err); }
      })
      Users.findByIdAndUpdate(req.body.from, {$push: {messages: message._id}}, {safe: true, upsert:true, new:true}, (err, user) => {
        if (err) { return res.status(500).json(err); }
      })
      return res.status(200).json(message);
    })
  },
  //PUT REQUEST
  editMessage (req, res, next) {
    if (!req.params.id) {return res.status(400).send("Not in Message")};
    Messages.findByIdAndUpdate(req.params.id, req.body)
    .populate('serviceRef')
    .populate('to')
    .populate('from')
    .exec( (err, response) => {
      if (err) { return res.send(err); }
      else {return res.json(response); }
    })
  },
  //DELETE REQUEST
  deleteMessage(req, res, next) {
    if (!req.params.id) {return res.status(400).send("Find Message To Delete")};
    Messages.findByIdAndRemove(req.params.id, req.body, (err, response) => {
      if (err) { return res.send(err); }
      Users.findByIdAndUpdate(response.to, {$pull: {messages: {$in: [req.params.id]}}}, {safe: true, upsert:true, new:true}, (err, user) => {
        if (err) { return res.send(err); }
      })
      Users.findByIdAndUpdate(response.from, {$pull: {messages: {$in: [req.params.id]}}}, {safe: true, upsert:true, new:true}, (err, user) => {
        if (err) { return res.send(err); }
      })
      return res.json(response);
    })
  }
}
