const express = require ('express')
const ContentController = require('../controllers/content')
const challengeRouter = require('./challenge')
const articleRouter = require('./article')

const JWT_MIDDLEWARE = require('../config').JWT_MIDDLEWARE
const ContentRouter = express.Router()

ContentRouter.use('/challenge', challengeRouter)
ContentRouter.use('/article', articleRouter)

// Get all contents
ContentRouter.get('/', JWT_MIDDLEWARE, (req, res) => {
  ContentController.findAll(req, res)
})

// Get one content by ID
ContentRouter.get('/:id([a-f\\d]{24})', (req, res) => {
  ContentController.findOne(req.params.id, res)
})

// Publish one content by ID
ContentRouter.post('/publish/:id([a-f\\d]{24})', JWT_MIDDLEWARE, (req, res) => {
  ContentController.publishOne(req.params.id, res)
})

// Archive one content by ID
ContentRouter.post('/archive/:id([a-f\\d]{24})', JWT_MIDDLEWARE, (req, res) => {
  ContentController.archiveOne(req.params.id, res)
})

// Get all published contents
ContentRouter.get('/published', (req, res) => {
  ContentController.publishedOnes(req, res)
})

ContentRouter.get('/filter/:categoryId([a-f\\d]{24})/:timeId([a-f\\d]{24})*?', (req, res) => {
  ContentController.findFiltered(req, res)
})

module.exports = ContentRouter