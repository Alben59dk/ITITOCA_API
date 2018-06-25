const ParticipationModel = require ('../models/participation')

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
          { path: 'content_id'},
          { path: 'author_id', select: '-password'}
        ]
        ParticipationModel.populate(obj, opts, (errP, obj) => {
          if (errP) {
            res.status(503).json({
              error: errP.message
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

module.exports = ParticipationController