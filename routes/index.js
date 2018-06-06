let express = require('express')
let router = express.Router()
const mongoose = require('mongoose')
let cors = require('cors')

mongoose.connect('mongodb://localhost:27017/ititoca')


var UserData = require('../models/user');

router.use(cors())
/* GET All users */
router.get('/', (req, res) => {
  console.log(`Getting all users...`)
  UserData.find({},(err, data) => {
    if(err) return handleError(err)
    if(data) return res.send(data)
  })
})

module.exports = router;