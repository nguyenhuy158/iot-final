var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var session = require('express-session');
var { Sequelize, DataTypes } = require('sequelize');

// Middleware to check if the user is authenticated
function ensureAuthenticated(req, res, next) {
  if (req.session.isAuthenticated) {
    return next();
  }
  res.redirect('/login');
}

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var usersRouter = require('./routes/users');
var dotenv = require('dotenv');
var app = express();
dotenv.config();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
}));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', authRouter);
app.use('/', ensureAuthenticated, indexRouter);
app.use('/users', ensureAuthenticated, usersRouter);

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404);
  res.render('404'); // Render 404 error page
});

// error handler for other errors
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Handle 500 errors explicitly
  if (res.statusCode === 500) {
    res.render('500'); // Render 500 error page
  } else {
    // For all other errors, render the default error page
    res.status(err.status || 500);
    res.render('error');
  }
});


module.exports = app;
