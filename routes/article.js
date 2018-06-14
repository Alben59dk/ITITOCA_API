let express = require ('express')
let multer = require('multer')
let multerGridfsStorage = require('multer-gridfs-storage')
let ArticleController = require('../controllers/article')

const storage = multerGridfsStorage({
  url: 'mongodb://localhost:27017/ititoca'
})

const upload = multer({storage: storage})

let ArticleRouter = express.Router()

const imageUpload = upload.single('image')
ArticleRouter.post('/', imageUpload, (req, res) => {
  if (req.body.title
      && req.body.description
      && req.body.content
      && req.body.categories
      && req.file && req.file.id) {
    ArticleController.addNew(req.body, req.file.id, res)
  } else {
    res.status(400).json({
      error: 'missing arguments'
    })
  }
})

module.exports = ArticleRouter