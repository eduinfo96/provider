const serviceCtrl = require('./serviceCtrl')

module.exports = app => {
  //GET REQUEST
    app.get('/api/services', serviceCtrl.getServices);
    app.get('/api/services/:id', serviceCtrl.getThisService);
  //APP POST
    app.post('/api/services', serviceCtrl.addService);
  //APP.PUT
    app.put('/api/services/:id', serviceCtrl.editService);
  //DELETE REQUEST
    app.delete('/api/services/:id', serviceCtrl.deleteService);
}
