const Sauce = require('../models/sauce');  
// importer le file system pour supprimer la Sauce
const fs = require('fs');


/******* la creation d'une article de sauce ***********************/
exports.postSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,     
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,        
        dislikes: 0,   
        usersLiked: [],  // les id usersLiked et usersDisliked avec des tableaux vides
        usersDisliked: []
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
/******* FIN: la creation (POST) *****************************************/


/******* aller à la page de sauce specifique ***********************/
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
            res.status(200).json(sauce);
        })
        .catch((error) => {
            res.status(404).json({ error });
        });
};
/******* FIN: aller à la page de sauce specifique ***********************/


/******* la modification de l'article de sauce ***********************/
exports.updateSauce = (req, res, next) => {
        const sauceObject = req.file ?              // s'il y a un fichier {oui traiter l'image}:{non traiter l'objet}
        {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` 
        } : { ...req.body };

        Sauce.updateOne({_id: req.params.id}, { ...sauceObject, _id: req.params.id})
            .then(() => {
                res.status(200).json({ message: 'Votre sauce est bien modifié!' });
            })
            .catch((error) => {
                res.status(400).json({ error });
            });
};
/********* FIN: la modification *****************************************/


/********* la suppression de l'article de sauce ****************************/
exports.deleteSauce = (req, res, next) => {
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
/********* FIN: la suppression ***********************************************/


/********* aller à la page des sauces(toutes les sauces) ***********************/
exports.getAllSauces = (req, res, next) => {  
    Sauce.find()
        .then((sauces) => {
            res.status(200).json(sauces);
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};
/********* FIN: aller à la page des sauces(toutes les sauces) ***********************/


/********* Mettre un LIKE ou un DISLIKE à l'article de sauce *********************/
exports.likeSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id}) 
        .then((sauce) => { 
            console.log('---> liker ou disliker la sauce');
            console.log(req.body.like); 
            console.log('---> contenu de "sauce" ');
            console.log(sauce);   

            //like = 1 (likes = +1) si l'utilisateur like premiere fois(ajouter liker)
            if (!sauce.usersLiked.includes(req.body.userId) && req.body.like === 1) {   
               // modifier les donnés sur mongoDB
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
            } else if (sauce.usersLiked.includes(req.body.userId) && req.body.like === 0) { 
                Sauce.updateOne({_id: req.params.id}, 
                { 
                    $inc: {likes: -1},                      //enlever un like et userId sur MongoDB
                    $pull: {usersLiked: req.body.userId}    //l'operateur de MongoDB(enlever la valeur dans array)
                })
                .then(() => {
                    res.status(201).json({ message: 'Un like ajouté est enlevé!(DB modifié)' });
                })
                .catch((error) => {
                    res.status(400).json({ error });
            });
            //like = -1 (dislikes = +1)
            } else if (!sauce.usersDisliked.includes(req.body.userId) && req.body.like === -1) {
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
            } else if (sauce.usersDisliked.includes(req.body.userId) && req.body.like === 0) {
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
        .catch((error) => res.status(400).json({ error }));  
};
/********* FIN: Mettre un LIKE ou un DISLIKE à l'article de sauce *********************/