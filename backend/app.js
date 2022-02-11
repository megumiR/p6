/****** mongoose d'abord *********/
const mongoose = require('mongoose');
const express = require('express');

const User = require('./models/user');
//const Sauce = require('./models/sauce');

/******** MongoDB connect to cluster0 *********/
mongoose.connect('mongodb+srv://megumi:<JZw7qlKVtgp24sVW>@clusterprojet6piiquante.ybmmt.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//pw: JZw7qlKVtgp24sVW
//dans le course: 'mongodb+srv://jimbob:<PASSWORD>@cluster0-pme76.mongodb.net/test?retryWrites=true&w=majority'
  /*********************** FIN: mongodb***************/


const app = express();
app.use((req, res, next) => {
  res.json({ message: 'request has received' })
});

/******************* ajouter des routes**************/
const userRoutes = require('./routes/user');
//const sauceRoutes = require('./routes/sauce')
/********* FIN: ajouter des routes****************/

app.use(express.json()); //acceder aux requetes json.body

/******* Controle d'acces pour les routes generales*********/
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
/********************* FIN: controle d'acces routes generales*****************/
//app.use(bodyParser.json());  //maybe not body parser...
/*
app.post('/', (req, res, next) => {
  delete req.body._id;  //??
  const sauce = new Sauce({
    ...req.body
  });
  sauce.save()
    .then(() => res.status(201).json({ message: 'new sauce created' }))
    .catch(error => res.status(400).json({ error }));
});

//update
app.put('/:id', (req, res, next) => {
  Sauce.updateOne({ _id: req.params.id}, { ...req.body, _id: req.params.id}) 
    .then
    .catch
});

//delete
app.delete('/:id', (req, res, next) => {
  Sauce.deleteOne({ _id: req.params.id})
    .then
    .catch
});
//recuper d'une thing specifique 
app.get('/api/stuff/:id', (req, res, next) => {
  Sauce.findOne({ _id: req.params.id})
    .then
    .catch
});
//recuperer de la liste
app.use('/api/stuff', (req, res, next) => {
  Thing.find()
    .then
    .catch
});
*/
app.post('/api/signup', (req, res, next) =>{
  console.log(req.body);
  res.status(201).json({ message });
});
/*
 app.get('/api/signup', (req, res, next) =>{
    const user = [
      {
        email: 'dupo99@oo.com',
        password: '123456'
      },
      {
        email: 'jean99@oo.com',
        password: '000000'
      }
    ];
    res.status(200).json(signup);
  });
 */

app.get('/api/signup', (req, res, next) =>{
    const user =new User({
        ...req.body // L'opérateur spread
    });
    user.save()
        .then(() => res.status(201).json({ message: 'object saved'}))
        .catch(error => res.status(400).json({ error }));
});

/********** Les routes ajoutes passent les chemins suivants ***********/
app.post('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);
/*
app.post('/api/sauces', sauceRoutes);
app.put('/api/sauces', sauceRoutes);
app.delete('/api/sauces', sauceRoutes);
app.get('/api/sauces', sauceRoutes);
*/
module.exports = app; 