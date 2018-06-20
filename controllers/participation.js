const ParticipationModel = require ('../models/participation')

class ParticipationController {

  static addNew (params, res) {
    let participation = new ParticipationModel({
      message: params.message,
      author_id: params.author,
      content_id: params.content_id,
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