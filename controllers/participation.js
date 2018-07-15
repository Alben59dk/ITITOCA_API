const ParticipationModel = require('../models/participation')
const mailjet = require('node-mailjet')
  .connect('abdd9a68b3717531394e1e17a8d94622', '077b22d48be25b44d773eb3129e95b10')

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
            res.status(201).json(obj)
            const request = mailjet
              .post('send', {'version': 'v3.1'})
              .request({
                'Messages': [
                  {
                    'From': {
                      'Email': 'martin@lapilulerouge.io', // to be modified
                      'Name': 'Ititoca' // to be modified
                    },
                    'To': [
                      {
                        'Email': 'gregolouise@cuvox.de',
                        'Name': 'passenger 1'
                      }
                    ],
                    'TemplateID': 482271,
                    'TemplateLanguage': true,
                    'Subject': "Nouvelle contribution d'un utilisateur au challenge",
                    'Variables': {
                      'firstName': req.user.userId,
                      'challengeName': req.param.id,
                      'challengeContribution': req.body.message
                    }
                  }
                ]
              })
              .request({
                'Messages': [
                  {
                    'From': {
                      'Email': 'martin@lapilulerouge.io', // to be modified
                      'Name': 'Ititoca' // to be modified
                    },
                    'To': [
                      {
                        'Email': 'passenger1@example.com',
                        'Name': 'passenger 1'
                      }
                    ],
                    'TemplateID': 481418,
                    'TemplateLanguage': true,
                    'Subject': 'Merci pour votre participation au challenge !',
                    'Variables': {
                      'firstName': req.user.pseudo,
                      'challengeName': ''
                    }
                  }
                ]
              })
            request
              .then((result) => {
                console.log(result.body)
              })
              .catch((err) => {
                console.log(err.statusCode)
                console.log('marche pas');
              })
          }
        })
      } else {
        res.status(204).json({})
        console.log('nope')
      }
    })
  }
}

module.exports = ParticipationController
