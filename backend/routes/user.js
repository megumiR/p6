const express = require('express');
const router = express.Router();

//const auth = require('../middleware/auth');

const userCtrl = require('../controlers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
/*
router.post('/signup', auth, userCtrl.signup);
router.post('/login', auth, userCtrl.login);
*///auth added and nodemon dosent work
module.exports = router;