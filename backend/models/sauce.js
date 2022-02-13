const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    heat: { type: Number, required: true },

    //system de like / dislike
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    usersLiked: { type: [String]},   //["String<userId>"]  ex ["1", "7", "9"]
    usersDisliked: { type: [String]}
/*    },
    {
        timestamps: true   //si on veut savoir l'heure de creation et modification
    }
    */
});


module.exports = mongoose.model('Sauce', sauceSchema);

