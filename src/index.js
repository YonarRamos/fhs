const express = require('express');
const app = express();
const path = require('path');


//SETTINGS
app.set('port', process.env.PORT || 3000);
//app.set('views', path.join(__dirname, '/views')); //esta linea indica a node donde esta la carpeta views, es necesaria si uso motores de plantillas
app.use(express.urlencoded({extended:false}));
//app.use(express.json);

//ROUTES
app.use(require('./routes/index.js'));

// static files
app.use(express.static(path.join(__dirname, 'public')));

//SERVER
app.listen(app.get('port'), () => {
    console.log('Escuchando en puerto', app.get('port'));

});
