let ParticipationModel = require ('../models/participation')

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
      } else {
        res.status(201).json(obj)
      }
    })
  }
}

module.exports = ParticipationController