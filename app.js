var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const session = require("express-session")
const Mongostore = require("connect-mongo")
const { authRouter } = require('./routes/authRouter');
const homeRouter = require('./routes/homeRouter')
const dairyRouter = require('./routes/dairyRouter')
require('dotenv').config()


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('connected');
  }).catch((err) => {
    console.log(err);
  })

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: Mongostore.create({
      mongoUrl: process.env.MONGO_URL,
      collectionName: 'session'
    }),
    cookie: {
      maxAge: 2400 * 60 * 60
    }
  })
)


app.use('/', authRouter)
app.use('/', homeRouter)
app.use('/', dairyRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
const PORT = 3000; // Choose your desired port
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running and accessible at http://localhost:${PORT}`);
  console.log(`Access from other devices on the network: http://192.168.161.251:${PORT}`);
});

module.exports = app;
