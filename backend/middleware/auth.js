const jwt = require('jsonwebtoken');
const { model, modelNames } = require('mongoose');

module.exports = (req, res, next) => {
    try {   //many error occurs so put in try-catch
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RAMDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        req.userId = userId; //the id which sends request = token's id
        
        if (req.body.userId && req.body.userId !== userId) {
            throw '403: unauthorized request.' ;  //'Invalid userId'
        } else {
            next();
        }
    } catch {
        res.status(401).json({
            error: new Error ('Requête invalide')
        });
    }
};