var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')

let UserModel = require('../models/user')

class UserController {

    static getUsers(req, res) {
        UserModel.find({},(err, data) => {
            if(err) {
                res.status(503).json({
                    error: err.message
                })    
                return
            }
            if(data) {
                 res.status(200).json(data)
            } 
          })
    }

    static userLogin(req, res) {
        console.log(req.body)
        UserModel.find({email: req.body.email})
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: "Auth Failedd"
                })
            }
            //DECRYPTION
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if(err) {
                return res.status(401).json({
                    message: "Auth Failed"
                })
            }
            if(result) {
                const token = jwt.sign(
                    //Payload
                    {
                        email: user[0].email,
                        userId: user[0]._id
                    },
                    'secret',
                    {
                        expiresIn: '1h'
                    }
                )
                console.log('pass ok')
                return res.status(200).json({
                    message: 'Auth sucessful',
                    token: token
                })
            }
            res.status(401).json({
                message: "Auth Failed"
                })
            })
            
        })
        .catch(err => {
            res.status(500).json({
            error: err
            })
        })
    }

    static createAdmin(req, res) {
        let salt = bcrypt.genSaltSync(11)
        let hash = bcrypt.hashSync(req.body.password, salt)
        let userInfo = {
          ...req.body,
          password: hash
        }
        let newUser = UserData(userInfo)
        newUser.save()
    }
}

module.exports = UserController
