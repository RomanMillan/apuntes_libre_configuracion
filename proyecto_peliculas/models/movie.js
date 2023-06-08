const { Schema, model } = require('mongoose');

const MovieSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    year:{
        type: Number
    },
    duration:{
        type: Number
    },
    description:{
        type: String
    },
    director:{
        type: String
    },
    cover:{
        type: String
    },
    idUser:{
        type: String
    },
    idGenre:{
        type: String,
        required: [true, 'Es necesario el id del genero'],  
    }
    
});


module.exports = model( 'Movie', MovieSchema );