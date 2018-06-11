var mongoose = require('mongoose')

var userDataSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  // avatar: {
  //   data: Buffer, contentType: String
  // },
  sex: {
    type: String
  },
  postal_code: {
    type: Number
  },
  age: {
    type: Number
  },
  // birthday_date: {
  //   type: Date
  // },
  // home_adress: {
  //   street_number: {type: String},
  //   route: {type: String},
  //   postal_code: {type: String},
  //   city: {type: String},
  //   country: {type: String}
  // },
  // phone_number: {
  //   type: String
  // },
  password: {
    type: String
  },
  roles: {
    type: [String]
  },
  active: {
    type: Boolean
  }
  // subscriptions: {
  //   type: [Boolean]
  // },
  // newsletters: {
  //   type: [String]
  // },
  // created_date: {
  //   type: Date
  // }
},{
  versionKey: false // You should be aware of the outcome after set to false
});

var UserData = mongoose.model('UserData', userDataSchema, 'users')
module.exports = UserData
