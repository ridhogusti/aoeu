import formidable from 'express-formidable';

const express = require('express');
const path = require('path');
// const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');

mongoose.connect('mongodb://localhost:27017/aoeu', (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Koneksi berhasil');
  }
});

const artikels = require('./routes/artikels');
const videos = require('./routes/videos');

const index = require('./routes/index');
const users = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// passport
app.use(passport.initialize());

app.use(cors());

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

app.use(formidable({
  encoding: 'utf-8',
  uploadDir: path.join(__dirname, 'public/images'),
  // multiples: true, // req.files to be arrays of files 
}));
app.use('/artikels', artikels);
app.use('/videos', videos);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
