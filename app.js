const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')

const userRouter = require('./routes/user');
const contentRouter = require('./routes/content')
const categoryRouter = require('./routes/category')

const app = express();

mongoose.connect('mongodb://localhost:27017/ititoca')

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'))
}

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Serve public files
app.use('/public', express.static('public'));

//ROUTER PREFIX
app.use('/user', userRouter);
app.use('/content', contentRouter)
app.use('/category', categoryRouter)

app.use(function (err, req, res, next) {
  if (err.code === 'permission_denied') {
    res.status(403).json({
      error: 'Permission denied'
    });
  } else if (err.name === 'UnauthorizedError') {
    res.status(401).json({
      error: 'Unauthorized access'
    });
  }
});
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
