let mongoose = require('mongoose')

let categoriesSchema = new mongoose.Schema({
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
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
})

let CategoriesModel = mongoose.model('CategoriesModel', categoriesSchema, 'categories')

module.exports = CategoriesModel
