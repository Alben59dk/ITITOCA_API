let express = require ('express')
let CategoryController = require('../controllers/category')

let CategoryRouter = express.Router()

CategoryRouter.get('/', (req, res) => {
  CategoryController.findAll(res)
})

module.exports = CategoryRouter
