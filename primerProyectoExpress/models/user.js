const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    email:{
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    },
    rol:{
        type: String,
        required: [true, 'El rol es obligatorio'],
    },
    active:{
        type: Boolean,
        default: true
    }
});

module.exports = model( 'User', UserSchema );