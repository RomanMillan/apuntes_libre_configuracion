// controllers/bird.js

const Bird = require('../models/birds');

// Tenemos que hacer la función async para poder utiilzar await dentro 
async function addBirdData(req = request, res = response) {
        // Obtenemos los datos del body, pero usamos la desestructuración de objetos para obtener solo los que nos interesan
    const { name, country, habitat, descripcion } = req.body;
        // Crearmos el objeto bird con el modelo importado
    const bird = new Bird({ name, country, habitat, descripcion  });


    // Guardar en BD
    await bird.save();

    res.json({
        bird
    });
}

module.exports = {addBirdData};