const http = require('http');   
/******** si je met https, server ne reponse pas (erreur 404)********/

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
  

/***** MongoDB si je vois le message , DB marche?? ****
const server = http.createServer((req, res) => {
    res.end('Voilà la réponse du serveur !');
});
change à lien suivant apres cree appjs
**********/
const server = http.createServer(app); //appjs (using express framework) send and receive requests n responses

/*************** all show on the console (eventListener, which port on which server address) ******************/
server.on('error', errorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
});

server.listen(port);