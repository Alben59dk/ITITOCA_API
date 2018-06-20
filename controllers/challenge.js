const ChallengeModel = require ('../models/challenge')
const slug = require('slug')
const fs = require('fs')

class ChallengeController {

  static addNew(params, image, res) {
    let challenge = new ChallengeModel({
      title: params.title,
      technical_name: slug(params.title),
      image: image.path,
      description: params.description,
      content: params.content,
      type: 'CHALLENGE',
      author_id: params.author,
      status: 'WAITING_FOR_VALIDATION',
      categories: params.categories,
      end_of_participation_date: params.endDate,
      synthesis: (params.synthesis ? params.synthesis : '')
    })

    challenge.save((errS, obj) => {
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
    let challenge = req.body
    if (req.file !== undefined && req.file.path !== undefined && req.file.path.length > 0) {
      challenge.image = req.file.path
    }
    challenge.technical_name = slug(challenge.title)

    ChallengeModel.findByIdAndUpdate(req.params.id, challenge,
        {new: true}, (err, doc) => {
          if (err) {
            res.status(503).json({
              error: err.message
            })
            return
          }
          if (doc) {
            let opts = [
              { path: 'categories'},
              { path: 'author_id', select: '-password'}
            ]
            ChallengeModel.populate(doc, opts, (err, obj) => {
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

module.exports = ChallengeController