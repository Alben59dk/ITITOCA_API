const express = require('express')

const UserRouter = express.Router()

const UserController = require('../controllers/user')

//Get all users
UserRouter.get('/', (req, res) => {
  UserController.findAll(req, res)
})

//User login
UserRouter.post('/login', (req, res, next) => {
  UserController.login(req, res)
})

//Create Admin User
UserRouter.post('/admin', (req, res) => {
  UserController.addAdmin(req, res)
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