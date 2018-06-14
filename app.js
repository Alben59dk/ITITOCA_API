var createError = require('http-errors');
var express = require('express');
var path = require('path');
let bodyParser = require('body-parser')
var cookieParser = require('cookie-parser');
var morgan = require('morgan');

var indexRouter = require('./routes/index');
let ChallengeRouter = require('./routes/challenge')
let articleRouter = require('./routes/article')
let contentRouter = require('./routes/content')
let categorieRouter = require('./routes/categorie')



var app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/content', contentRouter)
app.use('/categorie', categorieRouter)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
})

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
