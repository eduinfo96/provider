const Services = require('./Services')
const Users = require('../User/Users')
module.exports = {
//GET REQUEST
  getServices (req, res, next) {
    Services.find( (req.query) )
      .populate('user')
      .populate('reviews')
      .exec( (err,services) => {
        if (err) {return res.status(500).json(err); }
        return res.status(200).json(services);
      })
    },
  getThisService (req, res, next) {
    Services.findById(req.params.id)
      .populate('user')
      .populate('reviews')
      .exec( (err,services) => {
        if (err) {return res.status(500).json(err); }
        return res.status(200).json(services);
      })
  },
  //POST REQUEST
  addService (req, res, next) {
    new Services(req.body).save( (err, service) => {
      if (err) {return res.send(err)};
      Users.findByIdAndUpdate(req.body.user, {$push: {servicesOffered: service._id}}, {safe: true, upsert:true, new:true}, (err, user) => {
        if (err) { return res.send(err); }
      })
      return res.json(service);
    })
  },
  //PUT REQUEST
  editService (req, res, next) {
    if (!req.params.id) {return res.status(400).send("Not in User")};
    Services.findByIdAndUpdate(req.params.id, req.body, (err, response) => {
      if (err) { return res.send(err); }
      else {return res.json(response); }
    })
  },
  //DELETE REQUEST
  deleteService (req, res, next) {
    if (!req.params.id) {return res.status(400).send("Find User To Delete")};
    Services.findByIdAndRemove(req.params.id, req.body, (err, response) => {
      if (err) { return res.send(err); }
      Users.findByIdAndUpdate(response.user, {$pull: {servicesOffered: {$in: [req.params.id]}}}, {safe: true, upsert:true, new:true}, (err, user) => {
        if (err) { return res.send(err); }
      })
      return res.json(response);
    })
  }
}
