/****** Importer framework Express, Mongoose(mongoose d'abord)et path *********/
const mongoose = require('mongoose');
const express = require('express');

const path = require('path'); 
/****** FIN: Importer framework Express, Mongoose et path ********************/


/****** MongoDB Atlas connecte à cluster *************************************/
mongoose.connect('mongodb+srv://megumi:JZw7qlKVtgp24sVW@clusterprojet6piiquante.ybmmt.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
//pw: JZw7qlKVtgp24sVW
/******* FIN: MongoDB Atlas connecte à cluster ***********************************/

//Appeler la method express(qui permet de creer application express)
const app = express();
//acceder aux requetes json.body
app.use(express.json()); 

/******* Controle d'acces pour les API  ***************************/
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
/********************* FIN: controle d'acces routes generales*****************/


/************** Gerer la date du dossier images en maniere statique pour framework express*****************/
app.use('/images', express.static(path.join(__dirname, 'images')));
/************** FIN: Gerer la date du dossier images en maniere statique *********************************/ 


/********* ajouter des routes **********************/
const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce')
/********* FIN: ajouter des routes****************/


/********* Les routes d'autentificartion et  ***********/
app.use('/api/auth', userRoutes);   // pas de app.post
app.use('/api/sauces', sauceRoutes);
/********* FIN: Les routes d'autentificartion et  ***********/


/*********** Exporter l'application (const app) pour etre accedé par autres fichiers et server************/
module.exports = app; 
/*********** FIN: Exporter l'application (const app) ***************/