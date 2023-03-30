const express = require('express');
const app = express();

const birds = require('./routes/birds.js');


app.use('/birds',birds);
app.use('/birds/:name',birds);
app.use('/birds/:name/delete',birds);
app.use('/birds/add',birds)

app.get('/',(req,res)=>{
    res.send('Esta es la página principal');
});

app.get('/json',(req,res)=>{
    res.json({"Cancion":"La macarena"});
});

app.post('/registro',(req,res)=>{
    res.send("El usuario a sido registrado");
})

app.listen(3000,()=>{
    console.log("escuchando en el puerto 3000...");
})