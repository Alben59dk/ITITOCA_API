const express = require('express')

const UserRouter = express.Router()

const UserController = require('../controllers/user')

//Get all users
UserRouter.get('/', (req, res) => {
  UserController.findAll(res)
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

//Create Admin User
UserRouter.post('/admin', (req, res) => {
  if (req.body.email && req.body.pseudo && req.body.password) {
    UserController.addAdmin(req, res)
  } else {
    res.status(400).json({
      error: 'missing arguments'
    })
  }
})

//Deactivate User
UserRouter.post('/disable/:id([a-f\\d]{24})', (req, res) => {
  UserController.disableOne(req.params.id, res)
})

//Activate User
UserRouter.post('/activate/:id([a-f\\d]{24})', (req, res) => {
  UserController.activateOne(req.params.id, res)
})

//Delete User
UserRouter.delete('/delete/:id([a-f\\d]{24})', (req, res) => {
  UserController.deleteOne(req.params.id, res)
})

module.exports = UserRouter