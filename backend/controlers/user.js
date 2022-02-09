const bcrypt = require('bcrypt');
const User = require('../models/user');  //bring models

const jwt = require('jsonwebtoken');

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
    User.findOne({ email: req.body.email })
        .then( user => {
            if (!user) {      // no user correspondant
                return res.status(401).json({ error: "on ne trouve pas d'utilisateur" });
            }
            bcrypt.compare(req.body.password, user.password) //compare frontend data n database hashed data
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Le mot de passe est incorrect.' })
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(    //new token cryptnize
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({error}));
        })
        .catch(error => res.status(500).json({error}));
};

    