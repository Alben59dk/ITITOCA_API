const mongoose = require('mongoose')
const ArticleModel = require('./article.js')

let challengeSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['ARTICLE', 'CHALLENGE'],
    default: 'CHALLENGE',
    required: true
  },
  end_of_participation_date: {
    type: Date,
    required: true
  },
  synthesis: {
    type: String
  },
  embedded: {
    type: String,
    required: false
  },
})

let ChallengeModel = ArticleModel.discriminator('ChallengeModel', challengeSchema)

module.exports = ChallengeModel
