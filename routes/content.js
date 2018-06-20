const express = require ('express')
const ContentController = require('../controllers/content')
const challengeRouter = require('./challenge')
const articleRouter = require('./article')

//ROUTERS
const ContentRouter = express.Router()

ContentRouter.use('/challenge', challengeRouter)
ContentRouter.use('/article', articleRouter)

/////////////////
//    ROUTES   //
/////////////////
ContentRouter.get('/', (req, res) => {
  ContentController.findAll(req, res)
})

 ContentRouter.get('/:id', (req, res) => {
  ContentController.findOne(req.params.id, res)
})

ContentRouter.post('/publish/:id', (req, res) => {
  ContentController.publishOne(req.params.id, res)
})

ContentRouter.post('/archive/:id', (req, res) => {
  ContentController.archiveOne(req.params.id, res)
})

// Get all published contents
ContentRouter.get('/published', (req, res) => {
  ContentController.publishedOnes(req, res)
})

module.exports = ContentRouter