let express = require('express')
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const mongoose = require('mongoose')
let cors = require('cors')


let router = express.Router()
mongoose.connect('mongodb://localhost:27017/ititoca')

var UserData = require('../models/user');
var ContentData = require('../models/content');

router.use(cors())

//LOGIN 
router.post('/login', (req, res, next) => {
  //Looking through db for user
  UserData.find({email: req.body.email})
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth Failed"
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
      console.log(err)
      res.status(500).json({
        error: err
    })
  })
})

//SIGNUP
router.post('/signup', (req, res) => {
  let newUser = UserData(req.body)
  console.log(newUser)
  newUser.save()
});

/* GET All users */
router.get('/users', (req, res) => {
  UserData.find({},(err, data) => {
    if(err) return handleError(err)
    if(data) return res.send(data)
  })
})

/* DELETE A USER BY ID */
router.put('/users/:id', (req, res) => {
  console.log('req.body.activeBack: ' + req.body.activeBack)
  UserData.findByIdAndUpdate(req.params.id, {$set: {
    active: req.body.activeBack
  }}, (err) => {
    if(err) handleError(err)
    else res.status(200).end()
  })
})

// router.post('/content', (req, res) => {
//   ContentData
// });


module.exports = router