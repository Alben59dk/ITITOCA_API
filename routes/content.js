let express = require ('express')
let ContentController = require('../controllers/content')

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
  ContentController.findAll(res)
})

 ContentRouter.get('/:id', (req, res) => {
  ContentController.findOneContent(req.params.id, res)
})

ContentRouter.post('/publish/:id', (req, res) => {
  ContentController.publishOneContent(req.params.id, res)
})

ContentRouter.post('/archive/:id', (req, res) => {
  ContentController.archiveOneContent(req.params.id, res)
})

module.exports = ContentRouter