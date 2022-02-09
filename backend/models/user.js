const mongoose = require('mongoose');
//const uniqueValidator = require('mongoose-unique-validator');

/************ Set up rules*************/
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },  //unique
    password: { type: String, required: true }
});



//userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);