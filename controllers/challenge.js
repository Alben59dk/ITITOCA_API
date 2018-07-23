const ChallengeModel = require ('../models/challenge')
const slug = require('slug')
const fs = require('fs')
const mailjet = require('../mailjet')

class ChallengeController {
  static addNew(req, res) {
    let params = req.body
    let image = req.file
    let challenge = new ChallengeModel({
      title: params.title,
      technical_name: slug(params.title),
      image: image.path,
      embedded: params.embedded,
      description: params.description,
      content: params.content,
      type: 'CHALLENGE',
      author_id: req.user.userId,
      status: 'WAITING_FOR_VALIDATION',
      categories: params.categories.split(','),
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
        ChallengeModel.populate(obj, opts, (errP, obj) => {
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
    let challenge = {...req.body, categories: req.body.categories.split(',')}
    if (req.file !== undefined && req.file.path !== undefined && req.file.path.length > 0) {
      fs.unlink(challenge.image, (errU) => {
        if (errU) {
          res.status(503).json({
            error: errU.message
          })
        }
        console.log(challenge.image + ' was deleted');
      });
      challenge.image = req.file.path
    }
    challenge.technical_name = slug(challenge.title)
    challenge.last_update_date = Date.now()

    ChallengeModel.findByIdAndUpdate(req.params.id, challenge,
        {new: true}, (err, doc) => {
          if (err) {
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

  static getChallengeOfTheMonth(res) {
    ChallengeModel.find({
      end_of_participation_date: { $gte: Date.now() },
      status: 'PUBLISHED'
    })
    .sort('-last_update_date')
    .populate('categories')
    .populate('author_id', '-password')
    .limit(3)
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

  static inviteFriends (req, res) {
    for (let i = 0; i < req.body.mails.length; i++) {
      let variablesMailjet =
      {
        'challengeName': req.body.title
      }
      const sendInviteFriendsRequest = mailjet.sendRequestCreator([{Email: req.body.mails[i]}], 482273, 'Un ami vous invite à participer au challenge Ititoca', variablesMailjet)
      sendInviteFriendsRequest.then((result) => {
        return true
      })
      .catch((err) => {
        res.status(503).json({
          error: err
        })
        return false
      })
    }
    res.sendStatus(204)
  }
}

module.exports = ChallengeController
