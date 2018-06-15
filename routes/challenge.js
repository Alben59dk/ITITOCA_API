let express = require('express')
let ChallengeRouter = express.Router()

let ChallengeController = require('../controllers/challenge')


ChallengeRouter.put('/:id', (req, res) => {
    ChallengeController.modifyChallenge(req, res)
  })
  