const ArticleModel = require ('../models/article')

class ContentController {

  static findAll(req, res) {
    let contentPerPage = 10
    let page = req.query.page || 1

    ArticleModel.find({})
    .skip((contentPerPage * page) - contentPerPage)
    .limit(contentPerPage)
    .populate('author_id', '-password')
    .populate('categories')
    .sort('-last_update_date')
    .exec(function (err, result) {
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

  static findOne (id, res) {
    ArticleModel.findById(id)
    .populate('categories')
    .populate('author_id', '-password')
    .exec(function (err, article) {
      if (err) {
        res.status(503).json({
          error: err.message
        })
        return
      }
      if (article) {
        res.status(200).json(article)
      } else {
        res.status(200).json([])
      }
    })
  }

  static publishOne(id, res) {
    ArticleModel.findByIdAndUpdate(id, {
      status: 'PUBLISHED',
      last_update_date: Date.now()
    }, { new: true })
    .populate('categories')
    .populate('author_id', '-password')
    .exec(function (err, doc) {
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

  static archiveOne(id, res) {
    ArticleModel.findByIdAndUpdate(id, {
      status: 'ARCHIVED',
      last_update_date: Date.now()
    }, { new: true })
    .populate('categories')
    .populate('author_id', '-password')
    .exec(function (err, doc) {
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

module.exports = ContentController