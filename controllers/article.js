let ArticleModel = require ('../models/article')
let slug = require('slug')

class ArticleController {

  static addNew (params, imageId, res) {
    let article = new ArticleModel({
      title: params.title,
      technical_name: slug(params.title),
      image: imageId,
      description: params.description,
      content: params.content,
      type: 'ARTICLE',
      author_id: params.author,
      status: 'WAITING_FOR_VALIDATION',
      categories: params.categories
    })

    article.save((err, obj) => {
      if (err) {
        res.status(503).json({
          error: err.message
        })
      } else {
        res.status(201).json(obj)
      }
    })
  }

  static modifyArticle(req, res) {
    ArticleModel.findByIdAndUpdate(req.params.id, req.body, 
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