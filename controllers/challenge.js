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
}    })
    })
  }
