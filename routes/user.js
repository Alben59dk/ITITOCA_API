let express = require('express')

let UserRouter = express.Router()

var UserData = require('../models/user')

let UserController = require('../controllers/user')

UserRouter.get('/', (req, res) => {
  UserController.getUsers(req, res)
})

UserRouter.post('/login', (req, res, next) => {
  UserController.userLogin(req, res)
})

UserRouter.post('/admin', (req, res) => {
  UserController.createAdmin(req, res)
})

module.exports = UserRouter