let ArticleModel = require ('../models/article')
let slug = require('slug')
const fs = require('fs')

class ArticleController {

  static addNew (params, image, res) {
    let article = new ArticleModel({
      title: params.title,
      technical_name: slug(params.title),
      image: image.path,
      description: params.description,
      content: params.content,
      type: 'ARTICLE',
      author_id: params.author,
      status: 'WAITING_FOR_VALIDATION',
      categories: params.categories
    })

    article.save((errS, obj) => {
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

  static modifyOne(req, res) {
    let article = req.body
    if (req.file !== undefined && req.file.path !== undefined && req.file.path.length > 0) {
      article.image = req.file.path
    }
    article.technical_name = slug(article.title)
    article.last_update_date = Date.now()

    ArticleModel.findByIdAndUpdate(req.params.id, article,
      {new: true}, (err, doc) => {
        if (err) {
          res.status(503).json({
            error: err.message
          })
          return
        }
        if (doc) {
          res.status(200).json(doc)
        } else {
          res.status(204).json({})
        }
    })
  }
}

module.exports = ArticleController