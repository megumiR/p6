const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const sauceCtrl = require('../controlers/sauce');
const multer = require('multer');

router.post('/', auth, multer, sauceCtrl.postArticle);
router.get('/:id', auth, sauceCtrl.getOneArticle);
router.put('/:id', auth, multer, sauceCtrl.updateArticle);
router.delete('/:id', auth, sauceCtrl.deleteArticle);
router.get('/', auth, multer, sauceCtrl.getAllSaucearticles);

router.post('/:id/like', auth, sauceCtrl.likeArticle);
//auth added and nodemon dosent work for signin login