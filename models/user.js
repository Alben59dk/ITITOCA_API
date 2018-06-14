let mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  pseudo: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    require: true
  },
  roles: {
    type: String,
    required: true,
    enum: ['JUNIOR_CONTRIBUTOR', 'CONFIRMED_CONTRIBUTOR', 'ADMINISTRATOR'],
    default: 'JUNIOR_CONTRIBUTOR'
  },
  active: {
    type: Boolean,
    required: true
  },
  created_date: {
    type: Date,
    default: Date.now
  }
});

let UserModel = mongoose.model('UserData', userSchema, 'users')
module.exports = UserModel
