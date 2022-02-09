const bcrypt = require('bcrypt');
const User = require('../models/user');  //bring models

/**************** hash avec la fonction bcrypt pour le mot de passe ************/
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash   // not 'req.body.password'
            });
        });
        user.save()
            .then(() => res.status(201).json({ message: 'Post saved' }))
            .catch(error => res.status(400).json({error}));
        .catch(error => res.status(500).json({error}));
};

exports.login = (req, res, next) => {
//    User.findOne  // -> findOne for /api/xxx/:id


};

    