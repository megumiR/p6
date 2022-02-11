const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    heat: { type: Number, required: true },
    likes: { type: Number, required: true },
    dislikes: { type: Number, required: true },
    usersLiked: { type: String, required: true },   //["String<userId>"]  ex ["1", "7", "9"]
    usersDisliked: { type: String, required: true }  //["String<userId>"]
});


module.exports = mongoose.model('Sauce', sauceSchema);

