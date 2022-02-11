//const bcrypt = require('bcrypt');  no need?
const Sauce = require('../models/sauce');  

//const jwt = require('jsonwebtoken');   no need?
const fs = require('fs');

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
        likes: 0,        // req.body.likes?
        dislikes: 0,   //req.body.dislikes
        usersLiked: [],  //t les usersLiked et usersDisliked avec des tableaux vides
        usersDisliked: [], //req.body.usersLiked      req.body.usersDisliked
        userId: req.body.userId
    });
    sauce.save()
        .then(() => {
            res.status(201).json({ message: 'Votre sauce est bien enregistré!' });
        })
        .catch((error) => {
            res.status(400).json({ error }); 
        }
    );
};
/* COPIED et modifie par le course----------
exports.postArticle = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    //? delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
        .then(() => {
            res.status(201).json({ message: 'Votre sauce est bien enregistré!' });
        })
        .catch((error) => {
            res.status(400).json({ error }); 
        }
    );
};

*/



exports.getOneArticle = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
            res.status(200).json('<ID : '+ req.params.id +' >'+ sauce);
        })
        .catch((error) => {
            res.status(404).json({ error });
        });
};
  
exports.updateArticle = (req, res, next) => {
    const sauceObject = req.file ?              // s'il y a un fichier {oui traiter l'image}:{non traiter l'objet}
    {
        ...JSON.parse(req.body.sauce),
        image: `images/${req.file.filename}`  //`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
/*
    const sauce = new Sauce({      //  ...req.body ?Either sauce as JSON
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
*/
    Sauce.updateOne({_id: req.params.id}, { ...sauceObject, _id: req.params.id})
        .then(() => {
            res.status(200).json({ message: 'Votre sauce est bien modifié!' });
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};
// 'if' modification avec le fichier img ou pas 
/*    FIRST TRY --
exports.updateArticle = (req, res, next) => {
    const sauce = new Sauce({      //  ...req.body ?Either sauce as JSON
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
    Sauce.updateOne({_id: req.params.id}, sauce)
        .then(() => {
            res.status(201).json({ message: 'Votre sauce est bien modifié!' });
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

*/
exports.deleteArticle = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {                  // fonction unlink pour supprimer
                Sauce.deleteOne({_id: req.params.id})
                    .then(() => 
                        res.status(200).json({ message: 'Supprimé!' }))
                    .catch((error) => {
                        res.status(400).json({ error })
                    });
            });
        })
        .catch((error) => 
            res.status(500).json({ error })
        );
};
  
exports.getAllSaucearticles = (req, res, next) => {
    Sauce.find()
        .then((sauces) => {
            res.status(200).json(sauces);
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

exports.likeArticle = (req, res, next) => {
    const sauce = new Sauce({
/*        name: req.body.name,
        manufacturer: req.body.manufacturer,
        description: req.body.description,
        mainPepper: req.body.mainPepper,
        imageUrl: req.body.imageUrl,
        heat: req.body.heat,
        likes: 0,        // req.body.likes?
        dislikes: 0,   //req.body.dislikes     */
        usersLiked: [],  //t les usersLiked et usersDisliked avec des tableaux vides
        usersDisliked: [], //req.body.usersLiked      req.body.usersDisliked
        userId: req.body.userId
    });
/*    if () {
//        sauce.usersLiked += 
    } else if () {

    } else {

    }*/
    sauce.save()
        .then(() => {
            res.status(201).json({ message: 'Votre sauce est bien enregistré!' });
        })
        .catch((error) => {
            res.status(400).json({ error }); 
        }
    );


};