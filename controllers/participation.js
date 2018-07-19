const ParticipationModel = require('../models/participation')
const mailjet = require('../mailjet')

class ParticipationController {
  static addNew (req, res) {
    let participation = new ParticipationModel({
      message: req.body.message,
      author_id: req.user.userId,
      content_id: req.params.id,
      creation_date: Date.now()
    })

    participation.save((errS, obj) => {
      if (errS) {
        res.status(503).json({
          error: errS.message
        })
        return
      }
      if (obj) {
        let opts = [
          { path: 'content_id' },
          { path: 'author_id', select: '-password' }
        ]
        ParticipationModel.populate(obj, opts, (errP, obj) => {
          if (errP) {
            res.status(503).json({
              error: errP.message
            })
          } else {
            const newParticipationRequest = mailjet.sendRequestCreator([{Email: process.env.PARTICIPATION_MAIL_ADDR, Name: 'ITITOCA'}], 482271, 'Nouvelle contribution au challenge ' + obj.content_id.title, { firstName: req.user.pseudo, challengeName: obj.content_id.title, challengeContribution: req.body.message })
            const participationThanksRequest = mailjet.sendRequestCreator([{Email: req.user.email, Name: req.user.pseudo}], 481418, 'Merci pour votre partage', { firstName: req.user.pseudo, challengeName: obj.content_id.title })
            newParticipationRequest.then((result) => {
              return true
            })
            .catch((err) => {
              return false
            })
            participationThanksRequest.then((result) => {
              return true
            })
            .catch((err) => {
              return false
            })
            res.status(201).json(obj)
          }
        })
      } else {
        res.status(204).json({})
      }
    })
  }
}

module.exports = ParticipationController
