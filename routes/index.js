let express = require('express')
let router = express.Router()
const mongoose = require('mongoose')
let cors = require('cors')

mongoose.connect('mongodb://localhost:27017/ititoca')


var UserData = require('../models/user');

router.use(cors())
/* GET All users */
router.get('/users', (req, res) => {
  console.log(`Getting all users...`)
  UserData.find({},(err, data) => {
    if(err) return handleError(err)
    if(data) return res.send(data)
  })
})

router.delete('/users/:id', (req, res) => {
  UserData.findOneAndRemove({_id: req.params.id}, (err) => {
    if (err) return handleError(err)
    return res.end();
  })
});

module.exports = router;