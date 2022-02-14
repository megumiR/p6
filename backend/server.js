/************ Imporeter https pour un programe qui ecoute /repond les requete ***********/
const https = require('https');   
/************ FIN: Imporeter https *********************/

/************ Importer le fichier et mettre le port port app.js peut trouner ***********************/
const app = require('./app');

//when port is valid, return port
const normalizePort = val => {
    const port = parseInt(val, 10);
  
    if (isNaN(port)) {
      return val;
    }
    if (port >= 0) {
      return port;
    }
    return false;
};
const port = normalizePort(process.env.PORT || '3000');

app.set('port', port);
/************ FIN: Importer le fichier ***********************/


/****** find errors n stock in server*******/
const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.');
            process.exit(1);
            //break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.');
            process.exit(1);
            //break;
        default:
            throw error;
    }
};
  
/******* Creer un server du package https ****************/
//(function which will be called each req/res) 
//  -> appjs (using express framework) send/receive requests n responses
const server = https.createServer(app);
/******* FIN: Creer un server du package https ***********/



/*************** all show on the console (eventListener, which port on which server address) ******************/
server.on('error', errorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
});


/********** Server ecouter la requete envoyé (qui passe par ce port)***********/
server.listen(port);
/********** FIN: Server ecouter la requete  ***********/