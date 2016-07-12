const messageCtrl = require('./messageCtrl')

module.exports = app => {
//GET REQUEST
  app.get('/api/messages', messageCtrl.getMessages);
  app.get('/api/messages/:id', messageCtrl.getThisMessage);
//APP POST
  app.post('/api/messages', messageCtrl.sendMessage);
//APP.PUT
  app.put('/api/messages/:id', messageCtrl.editMessage);
//DELETE REQUEST
  app.delete('/api/messages/:id', messageCtrl.deleteMessage);
}
