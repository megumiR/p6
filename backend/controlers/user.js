const bcrypt = require('bcrypt');
const User = require('../models/user');  

const jwt = require('jsonwebtoken');

/****** la logique pour signin -- hash avec la fonction bcrypt pour le mot de passe ************/
exports.signup = (req, res, next) => {        
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash   // not 'req.body.password'
            });
            user.save()
                .then(() => 
                    res.status(201).json({ message: 'Utilisateur est crée!' })
                )
                .catch(error => 
                    res.status(400).json({ error })
                );
        })   
        .catch(error => 
            res.status(500).json({ error })
        );
};
/****** FIN: la logique pour signin  ************/


/****** la logique pour login -- l'authentification avec jwt pour login  ****************************/
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {      
                return res.status(401).json({ error: "on ne trouve pas d'utilisateur correspondant." });
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
                            'RAMDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => 
                    res.status(500).json({ error })
                );
        })
        .catch(error => 
            res.status(500).json({ error })
        );
};
/******** FIN: la logique pour login *****************/