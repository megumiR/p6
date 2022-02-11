//const bcrypt = require('bcrypt');  no need?
const Sauce = require('../models/sauce');  

//const jwt = require('jsonwebtoken');   no need?

/**************** hash avec la fonction bcrypt pour le mot de passe ************/

//postArticle, deleteArticle, getAllSaucearticles need Autorization

exports.postArticle = (req, res, next) => {
    const sauce = new Sauce({
        name: req.body.name,
        manufacturer: req.body.manufacturer,
        description: req.body.description,
        mainPepper: req.body.mainPepper,
        imageUrl: req.body.imageUrl,
        heat: req.body.heat,
        likes: req.body.likes,
        dislikes: req.body.dislikes,
        usersLiked: req.body.usersLiked,
        usersDisliked: req.body.usersDisliked,
        userId: req.body.userId
    });
    thing.save().then(
        () => {
            res.status(201).json({
                message: 'Post saved successfully!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};

exports.getOneArticle = (req, res, next) => {
    Sauce.findOne({
        _id: req.params.id
    }).then(
        (thing) => {
            res.status(200).json(thing);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
};
  
exports.updateArticle = (req, res, next) => {
    const sauce = new Sauce({
        _id: req.params.id,        // _id?? need to put usersLiked n usersDisliked?
        name: req.body.name,
        manufacturer: req.body.manufacturer,
        description: req.body.description,
        mainPepper: req.body.mainPepper,
        imageUrl: req.body.imageUrl,
        heat: req.body.heat,
        usersLiked: req.body.usersLiked,
        usersDisliked: req.body.usersDisliked,      
        userId: req.body.userId
    });
    Sauce.updateOne({_id: req.params.id}, sauce).then(
        () => {
            res.status(201).json({
                message: 'Article updated successfully!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};
  
exports.deleteArticle = (req, res, next) => {
    Sauce.deleteOne({_id: req.params.id}).then(
        () => {
            res.status(200).json({
                message: 'Deleted!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};
  
exports.getAllSaucearticles = (req, res, next) => {
    Sauce.find().then(
        (sauces) => {
            res.status(200).json(sauces);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};

exports.likeArticle = (req, res, next) => {

};