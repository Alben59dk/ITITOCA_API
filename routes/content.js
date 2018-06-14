let express = require ('express')
let ContentController = require('../controllers/content')
const ArticleRouter = require('./article')

let ContentRouter = express.Router()

ContentRouter.use('/article', ArticleRouter)

ContentRouter.get('/', (req, res) => {
  ContentController.findAll(res)
})

ContentRouter.post('/publish/:id', (req, res) => {
  ContentController.publishOneContent(req.params.id, res)
})

ContentRouter.post('/archive/:id', (req, res) => {
  ContentController.archiveOneContent(req.params.id, res)
})

module.exports = ContentRouter
