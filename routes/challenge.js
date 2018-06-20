let express = require('express')
let ChallengeRouter = express.Router()
const ChallengeController = require('../controllers/challenge')
const createUpload = require('../config')


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

module.exports = ChallengeRouter