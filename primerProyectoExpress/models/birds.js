const { Schema, model } = require('mongoose');

const BirdSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    country: {
        type: String,
        required: [true, 'El pais es obligatorio'],       
    },
    habitat: {
        type: String,
        required: [true, 'El hábitat es obligatorio'],       
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción es obligatoria'],       
    }
    
});

module.exports = model( 'Bird', BirdSchema );