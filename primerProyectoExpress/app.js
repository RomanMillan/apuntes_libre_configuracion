/* importamos el express */
const express = require('express');
const app = express();

/* usar el archivo .env */
require('dotenv').config();

/* importamos las rutas */
const birds = require('./routes/birds.js');
const birdData = require('./routes/bird.js');
const user = require('./routes/user.js');

/* Conectando MongoDB */
const { dbConnection } = require('./database/config.js');
async function connectAtlas(){ //await no se puede crear en el primer nivel y por eso tiene que tner la funcion
    await dbConnection();
}
connectAtlas();

/* middleware */
app.use(express.json());

/* ----------------------------------------------------------------------------*/
/* Usando BD MongoDb  */
app.use('/birdData',birdData);
app.use('/user',user);


/* ----------------------------------------------------------------------------*/

/* Usando BD (DISKDB) */
app.use('/birds',birds);


/* ----------------------------------------------------------------------------*/

/* Sin usar BD */
app.get('/',(req,res)=>{
    res.send('Esta es la página principal');
});

app.get('/json',(req,res)=>{
    res.json({"Cancion":"La macarena"});
});

app.post('/registro',(req,res)=>{
    res.send("El usuario a sido registrado");
})

/* ----------------------------------------------------------------------------*/

/* Establece la conexión */
const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`escuchando en el puerto ${PORT}`);
})
