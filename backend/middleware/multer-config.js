//importer le package Multer de npm pour form-data
const multer = require('multer');

//MINE(multipurpose internet main extensions)
const MINE_TYPE = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_').split('.').join('_');
        const extension = MINE_TYPE[file.minetype];
        callback(null, name + '-' + Date.now() + '.' + extension); //pour ne pas avoir le conflict de meme nom de fichier
    //    callback(null, `${name}-${Date.now()}.${extension}`);
    }
});

module.exports = multer({ storage }).single('image');