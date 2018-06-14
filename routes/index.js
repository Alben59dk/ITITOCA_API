let express = require('express')
let router = express.Router()
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');



var UserData = require('../models/user');

//Controllers import
let UserController = require('../controllers/user')

/* GET All users */
router.get('/users', (req, res) => {
  UserController.getUsers(req, res)
})

//LOGIN 
router.post('/login', (req, res, next) => {
  //Looking through db for user
  console.log(req.body.email)
  UserData.find({email: req.body.email})
    .exec()
    .then(user => {
      console.log('user: ' + user)
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
      console.log(err)
      res.status(500).json({
        error: err
    })
  })
})

//SIGNUP
router.post('/signup', (req, res) => {
  let salt = bcrypt.genSaltSync(11)
  let hash = bcrypt.hashSync(req.body.password, salt)
  let userInfo = {
    ...req.body,
    password: hash
  }
  let newUser = UserData(userInfo)
  newUser.save()
});

/* DELETE A USER BY ID */
router.patch('/users/:id', (req, res) => {
  console.log('req.body.activeBack: ' + req.body.activeBack)
  UserData.findByIdAndUpdate(req.params.id, {$set: {
    active: false
  }}, (err) => {
    if(err) return handleError(err)
    else res.status(200).end()
  })
})

router.post('/challenge', (req, res) => {
  console.log()
  let newChallenge = ChallengeModel(req.body)
  console.log(newChallenge)
  newChallenge.save()
});


module.exports = router