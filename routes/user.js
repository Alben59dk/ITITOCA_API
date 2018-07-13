const express = require('express')
const UserController = require('../controllers/user')
const UserRouter = express.Router()
const JWT_MIDDLEWARE = require('../config').JWT_MIDDLEWARE
const JWT_PERMISSIONS = require('../config').JWT_PERMISSIONS

//Get all users
UserRouter.get('/', JWT_MIDDLEWARE, JWT_PERMISSIONS.check('ADMINISTRATOR'), (req, res) => {
  UserController.findAll(res)
})

//Get user by id
UserRouter.get('/:id', JWT_MIDDLEWARE, JWT_PERMISSIONS.check([['ADMINISTRATOR'],['JUNIOR_CONTRIBUTOR'],['CONFIRMED_CONTRIBUTOR']]), (req, res) => {
  UserController.findOne(req.params.id, res)
})

//Create new user
UserRouter.post('/signup', (req, res) => {
  if (req.body.email && req.body.pseudo && req.body.password) {
    UserController.addOne(req, res)
  } else {
    res.status(400).json({
      error: 'missing arguments'
    })
  }
})

//User login
UserRouter.post('/login', (req, res) => {
  if (req.body.email && req.body.password) {
    UserController.login(req, res)
  } else {
    res.status(400).json({
      error: 'missing arguments'
    })
  }
})

//Admin login
UserRouter.post('/login/admin', (req, res) => {
  if (req.body.email && req.body.password) {
    UserController.loginAsAdmin(req, res)
  } else {
    res.status(400).json({
      error: 'missing arguments'
    })
  }
})

//Create Admin User
UserRouter.post('/admin', JWT_MIDDLEWARE, JWT_PERMISSIONS.check('ADMINISTRATOR'), (req, res) => {
  if (req.body.email && req.body.pseudo && req.body.password) {
    UserController.addAdmin(req, res)
  } else {
    res.status(400).json({
      error: 'missing arguments'
    })
  }
})

//Reset Password
UserRouter.post('/reset', (req, res) => {
  if (req.body.email) {
    UserController.resetPassword(req.body.email, res)
  } else {
    res.status(400).json({
      error: 'missing arguments'
    })
  }
})

//Deactivate User
UserRouter.post('/disable/:id([a-f\\d]{24})', JWT_MIDDLEWARE, JWT_PERMISSIONS.check('ADMINISTRATOR'), (req, res) => {
  UserController.disableOne(req.params.id, res)
})

//Activate User
UserRouter.post('/activate/:id([a-f\\d]{24})', JWT_MIDDLEWARE, JWT_PERMISSIONS.check('ADMINISTRATOR'), (req, res) => {
  UserController.activateOne(req.params.id, res)
})

//Delete User
UserRouter.delete('/delete/:id([a-f\\d]{24})', JWT_MIDDLEWARE, JWT_PERMISSIONS.check('ADMINISTRATOR'), (req, res) => {
  UserController.deleteOne(req.params.id, res)
})

UserRouter.post('/newsletter', (req, res) => {
  if (req.body.email) {
    UserController.sendNews(req.body.email, res)
  } else {
    res.status(400).json({
      error: 'missing arguments'
    })
  }
})

module.exports = UserRouter
