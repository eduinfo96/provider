const express = require('express');
const {json} = require('body-parser');
const session = require ('express-session');
const mongoose = require('mongoose');

const sessionConfig = require('./server/config/sessionConfig')
const masterRoutes = require('./server/masterRoutes');

const app = express();
const port = 9000;

app.use( json() );
app.use(express.static(`${__dirname}/public`));
app.use ( session (sessionConfig) );

const mongoUri = "mongodb://localhost/provider";
mongoose.connect(mongoUri);
mongoose.connection.once('open', ()=> {console.log(`Connected with mongo db at ${mongoUri}`)})

//Everything goes below app.use
masterRoutes(app);

app.listen(port, ()=> {
console.log(`Express is running on ${port}`);
});
