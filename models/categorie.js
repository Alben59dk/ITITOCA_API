let mongoose = require('mongoose')

let categorieSchema = new mongoose.Schema({
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

let CategorieModel = mongoose.model('CategorieModel', categorieSchema, 'categories')

module.exports = CategorieModel
