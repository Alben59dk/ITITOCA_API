const mailjet = require('node-mailjet')
const mailjetConnection = mailjet.connect('abdd9a68b3717531394e1e17a8d94622', '077b22d48be25b44d773eb3129e95b10')

exports.sendRequestCreator = function (dest, templateId, subject, variables) {
  const request = mailjetConnection
  .post('send', {'version': 'v3.1'})
  .request({
    'Messages': [
      {
        'From': {
          'Email': 'martin@lapilulerouge.io', // to be modified
          'Name': 'Ititoca' // to be modified
        },
        'To': dest,
        'TemplateID': templateId,
        'TemplateLanguage': true,
        'Subject': subject,
        'Variables': variables
      }
    ]
  })
  return request
}

exports.contactListRequestCreator = function (mail, listId) {
  const request = mailjetConnection
  .post('contactslist')
  .id(listId)
  .action('managecontact')
  .request({
      Email: mail,
      Action: 'addnoforce'
  })
  return request
}
