// importaciones
const express = require('express');
const app = express();

const user = require('./routes/user.js');
const genre = require('./routes/genre.js');
const movie = require('./routes/movie.js');

/* usar el archivo .env */
require('dotenv').config();

/* Conectando MongoDB */
const { dbConnection } = require('./database/config.js');
//await no se puede crear en el primer nivel y por eso tiene que tener la funcion
async function connectAtlas(){ 
    await dbConnection();
}
connectAtlas();


// middleware
app.use(express.json());

// accesos
app.use('/user',user);
app.use('/genre', genre);
app.use('/movie', movie);


/* Establece la conexión */
const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`escuchando en el puerto ${PORT}`);
})