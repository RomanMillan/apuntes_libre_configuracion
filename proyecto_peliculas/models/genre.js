const { Schema, model } = require('mongoose');

const GenreSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    idUser:{
        type : String
    }
    
});


module.exports = model( 'Genre', GenreSchema );