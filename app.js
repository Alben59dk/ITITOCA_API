let createError = require('http-errors');
let express = require('express');
let path = require('path');
let bodyParser = require('body-parser')
let cookieParser = require('cookie-parser');
let morgan = require('morgan')
let cors = require('cors')
const mongoose = require('mongoose')


let userRouter = require('./routes/user');
let contentRouter = require('./routes/content')

let app = express();
app.use(cors())

mongoose.connect('mongodb://localhost:27017/ititoca')



app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//ROUTER PREFIX
app.use('/user', userRouter);
app.use('/content', contentRouter)

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
