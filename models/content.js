var mongoose = require('mongoose')

var ContentDataSchema = new mongoose.Schema({
  title: {
    type: String
  },
  technical_name: {
    type: String,
    unique: true
  },
  short_image: {
    data: Buffer, contentType: String
  },
  short_description: {
    type: String
  },
  main_description: {
    type: String
  },
  type: {
    type: String
  },
  author_id: {
    type: String
  },
  publication: {
    start_date: {type: Date},
    end_date: {type: Date},
    status: {type: String},
    cause_of_refusal: {type: String}
  },
  challenge: {
    end_of_participation_date: {type: Date},
    synthesis: {type: String},
    participations_to_show: {type: [String]}
  },
  categories: {
    type: [String]
  },
  premium: {
    //false by default
    type: Boolean
  },
  updated_by_administrator: {
    type: Boolean
  },
  created_date: {
    type: Date
  },
  last_update_date: {
    type: Date
  }
})

var ContentData = mongoose.model('ContentData', ContentDataSchema, 'content')
module.exports = ContentData
