let ChallengeModel = require ('../models/challenge')

class ChallengeController {
    static modifyChallenge(req, res) {
        ChallengeModel.findByIdAndUpdate(req.params.id, req.body, 
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