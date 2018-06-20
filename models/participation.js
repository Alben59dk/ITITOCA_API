const mongoose = require('mongoose')

let participationSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  author_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'UserModel'
  },
  content_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'ChallengeModel'
  },
  creation_date: {
    type: Date,
    required: true,
    default: Date.now
  }
})

let ParticipationModel = mongoose.model('ParticipationModel', participationSchema, 'participations')

module.exports = ParticipationModel
