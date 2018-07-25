require('dotenv').config()

const mongoose = require('mongoose')
const fixtures = require('node-mongoose-fixtures')
const CategoryModel = require('../models/category')

mongoose.connect(process.env.MONGODB_URI);

fixtures.reset('CategoryModel', mongoose, (err) => {
  if (err) {
    console.log(err)
    mongoose.connection.close()
  } else {
    fixtures({
      CategoryModel: [
        {name: 'Cuisine + Alimentation', type: 'BOARD', image: 'public/images/categories/cuisine_alimentation.png'},
        {name: 'Sport + Mouvement', type: 'BOARD', image: 'public/images/categories/sport_mouvement.png'},
        {name: 'Maison', type: 'BOARD', image: 'public/images/categories/maison.png'},
        {name: 'Santé', type: 'BOARD', image: 'public/images/categories/sante.png'},
        {name: 'Energie', type: 'BOARD', image: 'public/images/categories/energie.png'},
        {name: 'Environnement', type: 'BOARD', image: 'public/images/categories/environnement.png'},
        {name: 'Travail', type: 'BOARD', image: 'public/images/categories/travail.png'},
        {name: 'Famille', type: 'BOARD', image: 'public/images/categories/famille.png'},
        {name: '15 minutes', type: 'TIME', image: 'public/images/categories/fifteen_minutes.svg'},
        {name: '30 minutes', type: 'TIME', image: 'public/images/categories/thirty_minutes.svg'},
        {name: '1 heure', type: 'TIME', image: 'public/images/categories/one_hour.svg'},
        {name: 'Un jour', type: 'TIME', image: 'public/images/categories/one_day.svg'},
        {name: '1 mois', type: 'TIME', image: 'public/images/categories/one_month.svg'},
        {name: 'Tout le temps', type: 'TIME', image: 'public/images/categories/all_time.svg'},
        {name: 'Moi', type: 'GLOBAL', image: 'null'},
        {name: 'Les autres', type: 'GLOBAL', image: 'null'},
        {name: 'La planète', type: 'GLOBAL', image: 'null'},
        {name: 'J\'apprends', type: 'GLOBAL', image: 'null'},
        {name: 'J\'agis', type: 'GLOBAL', image: 'null'},
        {name: 'Je partage', type: 'GLOBAL', image: 'null'}
      ]
    }, mongoose, function(err, data) {
      if (err) {
        console.log(err.message)
      }
      if (data) {
        console.log('Categories added with success');
      }
      mongoose.connection.close()
    });
  }
});
