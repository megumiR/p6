const User = require('../models/user');/*

exports.signup = (req, res, next) => {
    const user = new User({
        email: req.body.email,
        password: req.body.password   // where i can hash?
    });
    user.save()
        .then(() => { res.status(201).json({ message: 'Post saved' });
        .catch((error) => { res.status(400).json({error: error});
};

exports.login = (req, res, next) => {
//    User.findOne  // -> findOne for /api/xxx/:id


};

    })
} */