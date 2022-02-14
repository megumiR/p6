//importer le package de npm 
const passvalidator = require('password-validator');

const passvalidatorSchema = new passvalidator();

passvalidatorSchema 
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(1)                                // Must have at least 2 digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

module.exports = (req, res, next) => {
    if (passvalidatorSchema.validate(req.body.password)) {  //.validate -Methode à valider le mot de passe contre schema
        next();
    } else {
        return res.status(400).json({ error: "Le mot de passe n'est pas assez fort : majuscule, minuscule, chiffres, pas de l'espace, plus que 8 caractaires" });
    }
}