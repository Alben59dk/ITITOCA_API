const express = require ('express')
const CategoryController = require('../controllers/category')
const createUpload = require('../config').createUpload
const JWT_MIDDLEWARE = require('../config').JWT_MIDDLEWARE
const JWT_PERMISSIONS = require('../config').JWT_PERMISSIONS

const CategoryRouter = express.Router()

const imageUpload = createUpload('public/images/categories').single('image')

CategoryRouter.get('/', (req, res) => {
  CategoryController.findAll(res)
})

CategoryRouter.post('/', JWT_MIDDLEWARE, JWT_PERMISSIONS.check('ADMIN'), imageUpload, (req, res) => {
  if (req.body.name && req.body.type && req.file) {
    CategoryController.addNew(req.body, req.file, res)
  } else {
    res.status(400).json({
      error: 'missing arguments'
    })
  }
})

module.exports = CategoryRouter
