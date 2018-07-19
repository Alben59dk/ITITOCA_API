require('dotenv').config()

const mongoose = require('mongoose')
const fixtures = require('node-mongoose-fixtures')
const UserModel = require('../models/user')
const bcrypt = require('bcrypt')

mongoose.connect(process.env.MONGODB_URI);

let salt = bcrypt.genSaltSync(11)
let hash = bcrypt.hashSync('ititoca2018', salt)

fixtures({
  UserModel: [
    {email: 'bonjour@ititoca.com', pseudo: 'ITITOCA', password: hash, roles: 'ADMINISTRATOR'}
  ]
}, mongoose, function(err, data) {
  if (err) {
    if (err.code === 11000) {
      console.log('Admin already in base');
    } else {
      console.log(err.message);
    }
  }
  mongoose.connection.close()
});
