/* importamos el express */
const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');

/* usar el archivo .env */
require('dotenv').config();

/* importamos las rutas */
const birds = require('./routes/birds.js');
const birdData = require('./routes/bird.js');
const monkeys = require('./routes/monkeys.js');
const user = require('./routes/user.js');
const file = require('./routes/file.js')
const fileCloudinary = require('./routes/file.js')

/* Conectando MongoDB */
const { dbConnection } = require('./database/config.js');
async function connectAtlas(){ //await no se puede crear en el primer nivel y por eso tiene que tner la funcion
    await dbConnection();
}
connectAtlas();

/* middleware */
app.use(express.json());

// Manejo de archivos
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/',
    createParentPath: true
}));  

app.use('/file', file);

//app.use('/fileCloudinary', fileCloudinary);




/* ----------------------------------------------------------------------------*/
/* Usando BD MongoDb  */
app.use('/birdData',birdData);
app.use('/monkeys',monkeys);
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
