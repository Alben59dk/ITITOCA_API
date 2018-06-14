let mongoose = require('mongoose')

let articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  technical_name: {
    type: String,
    unique: true,
    required: true
  },
  image: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
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
    required: true
  },
  status: {
    type: String,
    enum: ['WAITING_FOR_VALIDATION', 'PUBLISHED', 'ARCHIVED'],
    required: true,
    default: 'WAITING_FOR_VALIDATION'
  },
  categories: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true
  },
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
