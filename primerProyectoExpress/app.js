const express = require('express');
const app = express();

require('dotenv').config();

const birds = require('./routes/birds.js');
const birdData = require('./routes/bird.js');
const userPost = require('./routes/user.js');

const { dbConnection } = require('./database/config.js');

/* usando la base de datos Mongodb */
// DATABASE CONNECTION 
async function connectAtlas(){ //await no se puede crear en el primer nivel y por eso tiene que tner la funcion
    await dbConnection();
}
connectAtlas();

app.use(express.json());

app.use('/birdData',birdData);
app.use('/userPost',userPost);


/* Usando base de datos de prueba (diskdb) */
app.use('/birds',birds);


/* Sin usar ninguna base de datos */
app.get('/',(req,res)=>{
    res.send('Esta es la página principal');
});

app.get('/json',(req,res)=>{
    res.json({"Cancion":"La macarena"});
});

app.post('/registro',(req,res)=>{
    res.send("El usuario a sido registrado");
})



/* Establece la conexión */
const PORT = process.env.PORT

app.listen(PORT,()=>{
    console.log(`escuchando en el puerto ${PORT}`);
})
