const express = require('express');
const app = express();
require('dotenv').config();
const birds = require('./routes/birds.js');

// DATABASE CONNECTION 
async function connectAtlas(){ //await no se puede crear en el primer nivel y por eso tiene que tner la funcion
    await dbConnection();
}
connectAtlas()

app.use(express.json())




app.use('/birds',birds);

app.get('/',(req,res)=>{
    res.send('Esta es la página principal');
});

app.get('/json',(req,res)=>{
    res.json({"Cancion":"La macarena"});
});

app.post('/registro',(req,res)=>{
    res.send("El usuario a sido registrado");
})
console.log(process.env.PRUEBA);

app.listen(process.env.PORT,()=>{
    console.log("escuchando en el puerto 3000...");
})
