const express = require('express')

const UserRouter = express.Router()

const UserController = require('../controllers/user')

//Get all users
UserRouter.get('/', (req, res) => {
  UserController.getUsers(req, res)
})

//User login
UserRouter.post('/login', (req, res, next) => {
  UserController.userLogin(req, res)
})

//Create Admin User
UserRouter.post('/admin', (req, res) => {
  UserController.createAdmin(req, res)
})

//Deactivate User
UserRouter.post('/disable/:id', (req, res) => {
  UserController.disableUser(req.params.id, res)
})

//Activate User
UserRouter.post('/activate/:id', (req, res) => {
  UserController.activateUser(req.params.id, res)
})

//Delete User
UserRouter.delete('/delete/:pseudo', (req, res) => {
  UserController.deleteUser(req.params.pseudo, res)
})

module.exports = UserRouter