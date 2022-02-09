const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator'); // to activate unique

/************ Set up rules*************/
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },  //unique
    password: { type: String, required: true }
});



userSchema.plugin(uniqueValidator); // to activate unique

module.exports = mongoose.model('User', userSchema);