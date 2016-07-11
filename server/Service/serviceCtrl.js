const Services = require('./serviceCtrl')
module.exports = {
//GET REQUEST
  getServices (req, res, next) {
    Services.find( (req.query), (err,services) => {
      if (err) {return res.send(err); }
      return res.json(services);
      })
    },
  getThisService (req, res, next) {
      Services.findById( req.params.id, (err, service) => {
      if (err) { return res.send(err); }
      return res.json(service);
    })
  },
  //POST REQUEST
  addService (req, res, next) {
    new Services(req.body).save( (err, service) => {
      if (err) {return res.send(err); }
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
      else {return res.json(response); }
    })
  }
}
