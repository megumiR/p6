const express = require('express');
const router = express.Router();
//importer middleware pour la validation de mot de passe
const passvalidator = require('../middleware/passvalidator'); 

const userCtrl = require('../controlers/user');

router.post('/signup', passvalidator, userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;