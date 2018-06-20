const express = require('express')
const ChallengeController = require('../controllers/challenge')
const ParticipationController = require('../controllers/participation')
const createUpload = require('../config')

const ChallengeRouter = express.Router()

const imageUpload = createUpload('public/images/challenges').single('image')

// Modify one challenge
ChallengeRouter.put('/:id', (req, res) => {
    ChallengeController.modifyOne(req, res)
})

// Add a new challenge
ChallengeRouter.post('/', imageUpload, (req, res) => {
  if (req.body.title
      && req.body.description
      && req.body.content
      && req.body.categories
      && req.body.endDate
      && req.file) {
    ChallengeController.addNew(req.body, req.file, res)
  } else {
    res.status(400).json({
      error: 'missing arguments'
    })
  }
})

// Add a new participation to one challenge
ChallengeRouter.post('/:id', (req, res) => {
  if (req.body.type === 'PARTICIPATION') {
    if (req.body.message && req.body.author && req.body.content_id) {
      ParticipationController.addNew(req.body)
    }
  } else {
    res.status(400).json({
      error: 'missing arguments'
    })
  }
})

module.exports = ChallengeRouter