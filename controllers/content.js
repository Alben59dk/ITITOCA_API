let ArticleModel = require ('../models/article')

class ContentController {

  static findAll(res) {
    ArticleModel.find({}, (err, result) => {
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

  static findOneContent (id, res) {
    ArticleModel.findById(id, (err, result) => {
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

  static publishOneContent(id, res) {
    ArticleModel.findByIdAndUpdate(id, {
      status: 'PUBLISHED'
    }, { new: true }, (err, doc) => {
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

  static archiveOneContent(id, res) {
    ArticleModel.findByIdAndUpdate(id, {
      status: 'ARCHIVED'
    }, { new: true }, (err, doc) => {
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