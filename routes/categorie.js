let express = require ('express')
let CategorieController = require('../controllers/categorie')

let CategorieRouter = express.Router()

CategorieRouter.get('/', (req, res) => {
  CategorieController.findAll(res)
})

module.exports = CategorieRouter
