const mongoose = require('mongoose')

let articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  technical_name: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: String,
    required: true
  },
  video: {
    type: String
  },
  description: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['ARTICLE', 'CHALLENGE'],
    default: 'ARTICLE',
    required: true
  },
  author_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'UserModel'
  },
  status: {
    type: String,
    enum: ['WAITING_FOR_VALIDATION', 'PUBLISHED', 'ARCHIVED'],
    required: true,
    default: 'WAITING_FOR_VALIDATION'
  },
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'CategoryModel'
  }],
  created_date: {
    type: Date,
    default: Date.now
  },
  last_update_date: {
    type: Date,
    default: Date.now
  }
})

let ArticleModel = mongoose.model('ArticleModel', articleSchema, 'contents')
module.exports = ArticleModel
