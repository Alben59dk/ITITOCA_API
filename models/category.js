let mongoose = require('mongoose')

let categorySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  type: {
    type: String,
    enum: ['BOARD', 'TIME', 'GLOBAL'],
    required: true
  },
  image: {
    type: String,
    required: true
  }
})

let CategoryModel = mongoose.model('CategoryModel', categorySchema, 'categories')

module.exports = CategoryModel
