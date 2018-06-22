const express = require('express')

const UserRouter = express.Router()

const UserController = require('../controllers/user')

//Get all users
UserRouter.get('/', (req, res) => {
  UserController.findAll(res)
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
UserRouter.post('/disable/:id', (req, res) => {
  UserController.disableOne(req.params.id, res)
})

//Activate User
UserRouter.post('/activate/:id', (req, res) => {
  UserController.activateOne(req.params.id, res)
})

//Delete User
UserRouter.delete('/delete/:pseudo', (req, res) => {
  UserController.deleteOne(req.params.pseudo, res)
})

module.exports = UserRouter