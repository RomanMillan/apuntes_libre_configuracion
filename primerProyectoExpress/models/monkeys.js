const { Schema, model } = require('mongoose');

const MonkeysSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    country: {
        type: String,
        required: [true, 'El pais es obligatorio'],       
    },
    type: {
        type: String,
        required: [true, 'El tipo es obligatorio'],       
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción es obligatoria'],       
    },
    rolMonkey:{
        type: String,
        required: [true, 'El rol de mono es obligatorio'],
        emun: ['AGGRESSIVE', 'SOCIAL']
    },
    idUser:{
        type: String,
        required: [true, 'Es necesario el id del usuario'],  
    }
    
});

module.exports = model( 'Monkey', MonkeysSchema );