const CategoryModel = require ('../models/category')
const fs = require('fs')

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


  static addNew(params, image, res) {
    let category = new CategoryModel({
      name: params.name,
      type: params.type,
      image: image.path
    })

    category.save((errS, obj) => {
      if (errS) {
        fs.unlink(image.path, (errU) => {
          if (errU) {
            res.status(503).json({
              error: errU.message
            })
          }
          console.log(image.path + ' was deleted');
        });
        res.status(503).json({
          error: errS.message
        })
      } else {
        res.status(201).json(obj)
      }
    })
  }
}

module.exports = CategoryController