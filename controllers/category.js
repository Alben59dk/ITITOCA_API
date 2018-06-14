let CategoryModel = require ('../models/category')

class CategoryController {

  static findAll(res) {
    CategoryModel.find({}, (err, result) => {
      if (err) {
        res.status(503).json({
          error: err.message
        })
        return
      }
      if (result) {
        res.status(200).json(result)
      } else {
        res.status(200).json([])
      }
    })
  }
}

module.exports = CategoryController