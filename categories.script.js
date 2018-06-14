const mongoose = require('mongoose')
let CategorieModel = require('./models/categorie')

mongoose.connect('mongodb://localhost:27017/ititoca')

const boardCategories = [
    'Cuisine et Alimentation',
    'Sport et Mouvement',
    'Mental',
    'Nature',
    'Enfants',
    'Famille',
    'Amis',
    'Travail',
    'Citoyenneté',
    'Maison',
    'Santé',
    'Energie',
    'Bienveillance',
    'L\'Art et moi',
    'L\'environnement'
]
const timeCategories = [
    '10 minutes',
    '30 minutes',
    '60 minutes',
    '1 jour',
    '1 week-end',
    '1 semaine'
]
const globalCategories = [
    'Moi',
    'Les autres',
    'La planète'
]

for (let elem of boardCategories) {
  let categorie = new CategorieModel({
    name: elem,
    type: 'BOARD',
    image: '5b2275139de0e11065bf5253'
  })
  categorie.save((err) => {
    if (err) {
      console.log('error saving ' + elem)
    } else {
      console.log('saving ' + elem + ' OK')
    }
  })
}

for (let elem of timeCategories) {
  let categorie = new CategorieModel({
    name: elem,
    type: 'TIME',
    image: '5b2275139de0e11065bf5253'
  })
  categorie.save((err) => {
    if (err) {
      console.log('error saving ' + elem)
    } else {
      console.log('saving ' + elem + ' OK')
    }
  })
}

for (let elem of globalCategories) {
  let categorie = new CategorieModel({
    name: elem,
    type: 'GLOBAL',
    image: '5b2275139de0e11065bf5253'
  })
  categorie.save((err) => {
    if (err) {
      console.log('error saving ' + elem)
    } else {
      console.log('saving ' + elem + ' OK')
    }
  })
}

process.exit