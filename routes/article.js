const express = require ('express')
const ArticleController = require('../controllers/article')
const createUpload = require('../config').createUpload
const JWT_MIDDLEWARE = require('../config').JWT_MIDDLEWARE

const ArticleRouter = express.Router()

const imageUpload = createUpload('public/images/articles').single('image')

// Add a new article
ArticleRouter.post('/', JWT_MIDDLEWARE, imageUpload, (req, res) => {
  if (req.body.title
      && req.body.description
      && req.body.content
      && req.body.categories
      && req.file) {
    ArticleController.addNew(req.body, req.file, res)
  } else {
    res.status(400).json({
      error: 'missing arguments'
    })
  }
})

//Modify one article
ArticleRouter.put('/:id([a-f\\d]{24})', JWT_MIDDLEWARE, imageUpload, (req, res) => {
  ArticleController.modifyOne(req, res)
})



module.exports = ArticleRouter