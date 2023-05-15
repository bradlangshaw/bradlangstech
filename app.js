var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');
var bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
// passport dependencies
let passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy;
var upload = multer({ dest: 'uploads/' });

var index = require('./routes/index');
var users = require('./routes/users');
var articles = require('./routes/articles');


var app = express();
var ig = require('instagram-node').instagram();

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/articles', articles);
// let mongoose = require('mongoose');
let config = require('./config/globals');


// use the User model to manage users
// var User = require('./models/user');
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// // mongoose
// mongoose.connect(config.db, {useUnifiedTopology: true,  useNewUrlParser: true });
// let db = mongoose.connection;
// db.once('open', function() {
//   console.log('Connected to mongodb');
// });


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
