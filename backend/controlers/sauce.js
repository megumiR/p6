const Sauce = require('../models/sauce');  

const fs = require('fs');

//??????????? Je dois mettre next(); dans chaque logiques sauf le derniere?
// -> 引用(citation à): https://openclassrooms.com/en/courses/6390246-passez-au-full-stack-avec-node-js-express-et-mongodb/6466277-creez-une-application-express
//postArticle, deleteArticle, getAllSaucearticles need Autorization

exports.postArticle = (req, res, next) => {
    delete req.body._id; // _id is sent by frontend.not from JSON: https://openclassrooms.com/en/courses/6390246-passez-au-full-stack-avec-node-js-express-et-mongodb/6466398-enregistrez-et-recuperez-des-donnees 
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
/*   requete  body inclut userId, like 0/1/-1
*/
    Sauce.findOne({_id: req.params.id}) //we call _id as the id from frontend 
        .then((element) => { 
            //like = 1 (likes = +1) si l'utilisateur like premiere fois(ajouter liker)
            if (!element.usersLiked.includes(req.body.userId) && req.body.bodyOfReqPostmanLike === 1) {   
               // modifier le data sur mongoDB
                Sauce.updateOne({_id: req.params.id}, 
                    { 
                        $inc: {likes: 1}, //l'operateur $inc de MongoDB(changer la valeur) meme s'il n'y a pas de champ, il cree le champ likes
                        $push: {usersLiked: req.body.userId}  //l'operateur de MongoDB(mettre la valeur dans array)
                    })
                    .then(() => {
                        res.status(201).json({ message: 'Un like est ajouté!(DB modifié)' });
                    })
                    .catch((error) => {
                        res.status(400).json({ error });
                });
            //like = 0 (pas de vote)
            } else if (element.usersLiked.includes(req.body.userId) && req.body.bodyOfReqPostmanLike === 0) { 
                Sauce.updateOne({_id: req.params.id}, 
                { 
                    $inc: {likes: -1}, //enlever un like et userId sur DB
                    $pull: {usersLiked: req.body.userId}    //l'operateur de MongoDB(enlever la valeur dans array)
                })
                .then(() => {
                    res.status(201).json({ message: 'Un like ajouté est enlevé!(DB modifié)' });
                })
                .catch((error) => {
                    res.status(400).json({ error });
            });
            //like = -1 (dislikes = +1)
            } else if (!element.usersDisliked.includes(req.body.userId) && req.body.bodyOfReqPostmanLike === -1) {
                Sauce.updateOne({_id: req.params.id}, 
                    { 
                        $inc: {dislikes: 1}, 
                        $push: {usersDisliked: req.body.userId}
                    })
                    .then(() => {
                        res.status(201).json({ message: 'Un dislike est ajouté!(DB modifié)' });
                    })
                    .catch((error) => {
                        res.status(400).json({ error });
                });
            //like = 0 (dislike = 0 , dislike enlevé)
            } else if (element.usersDisliked.includes(req.body.userId) && req.body.bodyOfReqPostmanLike === 0) {
                Sauce.updateOne({_id: req.params.id}, 
                    { 
                        $inc: {dislikes: -1}, 
                        $pull: {usersDisliked: req.body.userId}
                    })
                    .then(() => {
                        res.status(201).json({ message: 'Un dislike ajouté est enlevé!(DB modifié)' });
                    })
                    .catch((error) => {
                        res.status(400).json({ error });
                });
            } else {
                console.log('Like dislike if statement is not working?');
            }

        })
        .catch((error) => res.status(400).json({ error }));  //400??
};