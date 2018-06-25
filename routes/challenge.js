const express = require('express')
const ChallengeController = require('../controllers/challenge')
const ParticipationController = require('../controllers/participation')
const createUpload = require('../config').createUpload
const JWT_MIDDLEWARE = require('../config').JWT_MIDDLEWARE
const JWT_PERMISSIONS = require('../config').JWT_PERMISSIONS
const ChallengeRouter = express.Router()

const imageUpload = createUpload('public/images/challenges').single('image')

// Modify one challenge
ChallengeRouter.put('/:id([a-f\\d]{24})', JWT_MIDDLEWARE, JWT_PERMISSIONS.check('ADMIN'), imageUpload, (req, res) => {
    ChallengeController.modifyOne(req, res)
})

// Add a new challenge
ChallengeRouter.post('/', JWT_MIDDLEWARE, JWT_PERMISSIONS.check('ADMIN'), imageUpload, (req, res) => {
  if (req.body.title
      && req.body.description
      && req.body.content
      && req.body.categories
      && req.body.endDate
      && req.file) {
    ChallengeController.addNew(req, res)
  } else {
    res.status(400).json({
      error: 'missing arguments'
    })
  }
})

// Add a new participation to one challenge
ChallengeRouter.post('/:id([a-f\\d]{24})', JWT_MIDDLEWARE, JWT_PERMISSIONS.check([['ADMIN'],['JUNIOR_CONTRIBUTOR'],['CONFIRMED_CONTRIBUTOR']]), (req, res) => {
  if (req.body.type === 'PARTICIPATION') {
    if (req.body.message) {
      ParticipationController.addNew(req, res)
    }
  } else {
    res.status(400).json({
      error: 'missing arguments'
    })
  }
})

ChallengeRouter.get('/ofthemonth', (req, res) => {
  ChallengeController.getChallengeOfTheMonth(res)
})

module.exports = ChallengeRouter