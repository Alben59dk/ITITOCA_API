const express = require ('express')
const ArticleController = require('../controllers/article')
const createUpload = require('../config').createUpload
const JWT_MIDDLEWARE = require('../config').JWT_MIDDLEWARE
const JWT_PERMISSIONS = require('../config').JWT_PERMISSIONS

const ArticleRouter = express.Router()

const imageUpload = createUpload('public/images/articles').single('image')

// Add a new article
ArticleRouter.post('/', JWT_MIDDLEWARE, JWT_PERMISSIONS.check('ADMINISTRATOR'), imageUpload, (req, res) => {
  if (req.body.title
      && req.body.description
      && req.body.content
      && req.body.categories
      && req.file) {
    ArticleController.addNew(req, res)
  } else {
    res.status(400).json({
      error: 'missing arguments'
    })
  }
})

//Modify one article
ArticleRouter.put('/:id([a-f\\d]{24})', JWT_MIDDLEWARE, JWT_PERMISSIONS.check('ADMINISTRATOR'), imageUpload, (req, res) => {
  ArticleController.modifyOne(req, res)
})



module.exports = ArticleRouter