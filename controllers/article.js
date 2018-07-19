const ArticleModel = require ('../models/article')
const slug = require('slug')
const fs = require('fs')

class ArticleController {

  static addNew (req, res) {
    let params = req.body
    let image = req.file
    let article = new ArticleModel({
      title: params.title,
      technical_name: slug(params.title),
      image: image.path,
      description: params.description,
      content: params.content,
      type: 'ARTICLE',
      author_id: req.user.userId,
      status: 'WAITING_FOR_VALIDATION',
      categories: params.categories.split(',')
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
        if (errS.code === 11000) {
          res.status(409).json({
            code: 11000,
            error: errS.message
          })
        } else {
          res.status(503).json({
            error: errS.message
          })
        }
      } else {
        let opts = [
          { path: 'categories'},
          { path: 'author_id', select: '-password'}
        ]
        ArticleModel.populate(obj, opts, (errP, obj) => {
          if (errP) {
            res.status(503).json({
              error: errP.message
            })
          } else {
            res.status(201).json(obj)
          }
        })
      }
    })
  }

  static modifyOne(req, res) {
    let article = {...req.body, categories: req.body.categories.split(',')}
    if (req.file !== undefined && req.file.path !== undefined && req.file.path.length > 0) {
      fs.unlink(article.image, (errU) => {
        if (errU) {
          res.status(503).json({
            error: errU.message
          })
        }
        console.log(article.image + ' was deleted');
      });
      article.image = req.file.path
    }
    article.technical_name = slug(article.title)
    article.last_update_date = Date.now()

    ArticleModel.findByIdAndUpdate(req.params.id, article,
      {new: true}, (err, doc) => {
        if (err) {
          fs.unlink(req.file.path, (errU) => {
            if (errU) {
              res.status(503).json({
                error: errU.message
              })
            }
            console.log(req.file.path + ' was deleted');
          });
          if (err.code === 11000) {
            res.status(409).json({
              code: 11000,
              error: err.message
            })
          } else {
            res.status(503).json({
              error: err.message
            })
          }
          return
        }
        if (doc) {
          let opts = [
            { path: 'categories'},
            { path: 'author_id', select: '-password'}
          ]
          ArticleModel.populate(doc, opts, (err, obj) => {
            if (err) {
              res.status(503).json({
                error: err.message
              })
            } else {
              res.status(201).json(obj)
            }
          })
        } else {
          res.status(204).json({})
        }
    })
  }
}

module.exports = ArticleController
