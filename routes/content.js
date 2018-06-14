let express = require ('express')
let ArticleController = require('../controllers/article')
const ArticleRouter = require('./article')

let ContentRouter = express.Router()

ContentRouter.use('/article', ArticleRouter)

ContentRouter.get('/', (req, res) => {
  ArticleController.findAll(res)
})

module.exports = ContentRouter
