const mailjet = require('node-mailjet')
const mailjetConnection = mailjet.connect(process.env.MAILJET_USER, process.env.MAILJET_PASSWORD)

exports.sendRequestCreator = function (dest, templateId, subject, variables) {
  const request = mailjetConnection
  .post('send', {'version': 'v3.1'})
  .request({
    'Messages': [
      {
        'From': {
          'Email': process.env.MAILJET_SENDER_EMAIL, // to be modified
          'Name': process.env.MAILJET_SENDER_NAME // to be modified
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
