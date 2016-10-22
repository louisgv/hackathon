import 'babel/polyfill';
import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session';
import mongoose from 'mongoose';
import passport from 'passport';
import logger from 'morgan';
import favicon from 'serve-favicon';
import connectFlash from 'connect-flash';
import connectMongo from 'connect-mongo';

require('dotenv').config();

import routes from './router';
import api from './router/api';
import User from './schemas/user';


const MongoStore = connectMongo(session);
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'ejs');

mongoose.connect(process.env.MONGODB_URI);

// uncomment after pla cing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(connectFlash());
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({mongooseConnection: mongoose.connection})
}));
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use('/api', api);
app.use('/', routes);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next();
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (req, res) {
    res.render('error.ejs', {
      error: res.status
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (status, req, res) {
  res.render('error.ejs', {
    error: res.status
  });
});


app.set('port', (process.env.PORT || 5001));
//
// Launch the server
// -----------------------------------------------------------------------------
//TODO(pratclif) explore what process.send means and does
app.listen(app.get('port'), () => {
  if (process.send) {
    process.send('online');
    console.log('The server is running at http://localhost:' + app.get('port'));
  } else {
    console.log('The server is running at http://localhost:' + app.get('port'));
  }
});
