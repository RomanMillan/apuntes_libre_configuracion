// importaciones
const express = require('express');
const app = express();

const user = require('./routes/user.js');

/* usar el archivo .env */
require('dotenv').config();


// middleware
app.use(express.json());

// accesos
app.use('/user',user);


/* Establece la conexión */
const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`escuchando en el puerto ${PORT}`);
})