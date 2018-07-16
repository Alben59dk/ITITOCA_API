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

mongoose.connect(process.env.MONGODB_URI)

if (process.env.NODE_ENV !== 'production') {
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

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
})

app.use(function (err, req, res, next) {
  if (err.code === 'permission_denied') {
    res.status(403).json({
      error: 'Permission denied'
    });
  } else if (err.name === 'UnauthorizedError') {
    res.status(401).json({
      error: 'Unauthorized access'
    });
  } else {
    res.status(404).json({})
  }
});

module.exports = app;
