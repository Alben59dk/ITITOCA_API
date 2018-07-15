const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const JWT_SECRET = require('../config').JWT_SECRET
const crypto = require('crypto')

const UserModel = require('../models/user')


const mailjet = require('node-mailjet')
  .connect('abdd9a68b3717531394e1e17a8d94622', '077b22d48be25b44d773eb3129e95b10')

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

  static findOne (id, res) {
    UserModel.findById(id)
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
      if (user === null || user === undefined || user.length < 1) {
        return res.status(401).json({
          error: 'Auth Failed : email not found'
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
            error: 'Auth Failed : wrong password'
          })
        } else {
          if (user[0].active) {
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
              error: "Auth Failed : account disabled"
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

  static loginAsAdmin(req, res) {
    UserModel.find({
      email: req.body.email
    })
    .exec()
    .then(user => {
      if (user === null || user === undefined || user.length < 1) {
        return res.status(401).json({
          error: 'Auth Failed : email not found'
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
            error: 'Auth Failed : wrong password'
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
              error: 'Auth Failed : permission denied.'
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
        const request = mailjet
          .post('send', {'version': 'v3.1'})
          .request({
            'Messages': [
              {
                'From': {
                  'Email': 'martin@lapilulerouge.io', // to be modified
                  'Name': 'Ititoca' // to be modified
                },
                'To': [
                  {
                    'Email': req.body.email,
                    'Name': req.body.pseudo
                  }
                ],
                'TemplateID': 479346,
                'TemplateLanguage': true,
                'Subject': 'Bienvenue chez nous',
                'Variables': {
                  'firstName': req.body.pseudo
                }
              }
            ]
          })
        request
          .then((result) => {
            console.log(result.body)
          })
          .catch((err) => {
            console.log(err.statusCode)
          })
      }
    })
  }

  static addAdmin (req, res) {
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

  static resetPassword (mail, res) {
    UserModel.find({
      email: mail
    })
      .exec()
      .then(users => {
        if (users === null || users === undefined || users.length < 1) {
          return res.status(401).json({
            error: 'Auth Failed : email not found'
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
            const request = mailjet
              .post('send', {'version': 'v3.1'})
              .request({
                'Messages': [
                  {
                    'From': {
                      'Email': 'martin@lapilulerouge.io', // to be modified
                      'Name': 'Ititoca' // to be modified
                    },
                    'To': [
                      {
                        'Email': obj.email,
                        'Name': obj.pseudo
                      }
                    ],
                    'TemplateID': 481379,
                    'TemplateLanguage': true,
                    'Subject': 'Votre demande de mot de passe Ititoca',
                    'Variables': {
                      'firstName': obj.pseudo,
                      'password': newPassword
                    }
                  }
                ]
              })
            request
              .then((result) => {
                console.log(result.body)
              })
              .catch((err) => {
                console.log(err.statusCode)
              })
            console.log('Email sent to ' + mail)
            res.status(204).json({})
          } else {
            res.status(400).json({
              error: 'error unknown'
            })
          }
        })
      })
  }

  static sendNews (mail, res) {
    const request = mailjet
      .post('send', {'version': 'v3.1'})
      .request({
        'Messages': [
          {
            'From': {
              'Email': 'martin@lapilulerouge.io', // to be modified
              'Name': 'Ititoca' // to be modified
            },
            'To': [
              {
                'Email': mail
              }
            ],
            'TemplateID': 481395,
            'TemplateLanguage': true,
            'Subject': 'Ititoca : confirmation de votre inscription'
          }
        ]
      })
    request
      .then((result) => {
        console.log(result.body)
        res.status(201).json({})
      })
      .catch((err) => {
        console.log(err.statusCode)
        res.status(503).json({})
      })
  }
}

module.exports = UserController
