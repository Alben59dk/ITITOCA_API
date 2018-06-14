let express = require ('express')
let ContentController = require('../controllers/content')

//let challengeRouter = require('./challenge')
let articleRouter = require('./article')

//ROUTERS
let ContentRouter = express.Router()
//ContentRouter.use('/challenge', challengeRouter)
ContentRouter.use('/article', articleRouter)

/////////////////
//    ROUTES   //
/////////////////
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