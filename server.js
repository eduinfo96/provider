const express = require('express');
const {json} = require('body-parser');
const session = require ('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

const sessionConfig = require('./server/config/sessionConfig');
const FacebookConfig = require('./server/config/FacebookConfig')
const masterRoutes = require('./server/masterRoutes');

const app = express();
const port = 3000;

app.use( json() );
app.use( express.static(`${__dirname}/public`));
app.use( session (sessionConfig) );
app.use( passport.initialize());
app.use( passport.session());

passport.use( new FacebookStrategy(FacebookConfig, (token, refreshToken, profile, done) => {
  return done(null, profile);
}))

const mongoUri = "mongodb://localhost/provider";
mongoose.connect(mongoUri);
mongoose.connection.once('open', ()=> {console.log(`Connected with mongo db at ${mongoUri}`)})

//Everything goes below app.use
masterRoutes(app);

app.listen(port, ()=> {
console.log(`Express is running on ${port}`);
});
