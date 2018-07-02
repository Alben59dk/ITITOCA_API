const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const JWT_SECRET = require('../config').JWT_SECRET
const crypto = require('crypto')

const UserModel = require('../models/user')

class UserController {

  static findAll(res) {
    UserModel.find({})
    .exec(function (err, data) {
      if(err) {
        res.status(503).json({
          error: err.message
        })
        return
      }
      if(data) {
        res.status(200).json(data)
      } else {
        res.status(200).json([])
      }
    })
  }

  static login(req, res) {
    UserModel.find({
      email: req.body.email
    })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          error: "Auth Failed : email not found"
        })
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          res.status(503).json({
            error: err
          })
          return
        }
        if (!result) {
          res.status(401).json({
            error: "Auth Failed : wrong password"
          })
        } else {
          const token = jwt.sign(
              {
                email: user[0].email,
                userId: user[0]._id,
                role: user[0].roles,
              },
              JWT_SECRET
            )
          res.status(200).json({
              token: token
          })
        }
      })
    })
    .catch(err => {
        res.status(503).json({
          error: err.message
        })
    })
  }

  static loginAsAdmin(req, res) {
    UserModel.find({
      email: req.body.email
    })
    .exec()
    .then(user => {
      if (user === null || user === undefined || user.length < 1) {
        return res.status(401).json({
          error: "Auth Failed : email not found"
        })
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          res.status(503).json({
            error: err
          })
          return
        }
        if (!result) {
          res.status(401).json({
            error: "Auth Failed : wrong password"
          })
        } else {
          if (user[0].roles === 'ADMINISTRATOR') {
            const token = jwt.sign(
                {
                  email: user[0].email,
                  userId: user[0]._id,
                  role: user[0].roles,
                },
                JWT_SECRET
              )
            res.status(200).json({
                token: token
            })
          } else {
            res.status(403).json({
              error: "Auth Failed : permission denied."
            })
          }
        }
      })
    })
    .catch(err => {
        res.status(503).json({
          error: err.message
        })
    })
  }

  static addOne(req, res) {
    let salt = bcrypt.genSaltSync(11)
    let hash = bcrypt.hashSync(req.body.password, salt)
    let newUser = new UserModel({
      email: req.body.email,
      pseudo: req.body.pseudo,
      password: hash,
      roles: 'JUNIOR_CONTRIBUTOR'
    })
    newUser.save(function (err, user) {
      if (err) {
        if (err.code === 11000) {
          res.status(409).json({
            code: 11000,
            message: err.message
          })
        } else {
          res.status(503).json({
            message: err.message
          })
        }
      } else {
        res.status(200).json(user)
      }
    })
  }

  static addAdmin(req, res) {
    let salt = bcrypt.genSaltSync(11)
    let hash = bcrypt.hashSync(req.body.password, salt)
    let newUser = new UserModel({
      email: req.body.email,
      pseudo: req.body.pseudo,
      roles: 'ADMINISTRATOR',
      password: hash    
    })
    newUser.save(function (err, user) {
      if (err) {
        if (err.code === 11000) {
          res.status(409).json({
            code: 11000,
            message: err.message
          })
        } else {
          res.status(503).json({
            message: err.message
          })
        }
      } else {
          res.status(200).json(user)
      }
    })
  }

  static disableOne(id, res) {
    UserModel.findByIdAndUpdate(id, {
      active: false
    }, { new:  true }, (err, doc) => {
      if(err) {
        res.status(503).json({
          error: err.message
        })
        return
      }
      if (doc) {
        res.status(201).json(doc)
      } else {
        res.status(204).json({})
      }
    })
  }

  static activateOne(id, res) {
    UserModel.findByIdAndUpdate(id, {
      active: true
    }, { new:  true }, (err, doc) => {
      if(err) {
        res.status(503).json({
          error: err.message
        })
        return
      }
      if (doc) {
        res.status(201).json(doc)
      } else {
        res.status(204).json({})
      }
    })
  }

  static deleteOne(id, res) {
    UserModel.findByIdAndDelete(id, (err) => {
      if (err) {
        res.status(503).json({
          error: err.message
        })
        return
      }
      res.status(204).json({})
    })
  }

  static resetPassword(mail, res) {
    UserModel.find({
      email: mail
    })
    .exec()
    .then(users => {
      if (users === null || users === undefined || users.length < 1) {
        return res.status(401).json({
          error: "Auth Failed : email not found"
        })
      }
      let user = users[0]
      let newPassword = crypto.randomBytes(20).toString('hex').substring(15, 25)
      console.log(newPassword)
      let salt = bcrypt.genSaltSync(11)
      let hash = bcrypt.hashSync(newPassword, salt)
      UserModel.findOneAndUpdate({ email: mail }, { password: hash }, (err, obj) => {
        if (err) {
          res.status(503).json({
            error: err.message
          })
        } else if (obj) {
          //Send email
          console.log('Email sent to ' + obj.email)
          res.status(204).json({})
        } else {
          res.status(400).json({
            error: 'error unknown'
          })
        }
      })
    })
  }
}

module.exports = UserController
