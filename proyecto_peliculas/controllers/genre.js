const Genre = require('../models/genre');
const User = require('../models/user');
const {genJWT} = require('../helpers/genJWT');
const { request, response } = require('express');

const express = require('express');
const app = express();

// obtener todos los generos
async function getAllGenres(req = request, res = response){
    const genre = await Genre.find();
    
    if(genre.length === 0){
        return res.status(400).json({
            msg: 'No se ha encontrado ningún genero'
        });
    }

    res.send(
        genre
    )
}

// añade un genero
async function addGenre(req = request, res = response) {
    const { name, idUser} = req.body;
    const genre = new Genre({ name, idUser });

    // Validar si existe el nombre
    const nameNoValid = await Genre.findOne({name});
    if (nameNoValid){
        return res.status(400).json({
            msg: 'El nombre ya está registrado'
        });
    }

    // Validar si existe el id de usuario
    const idUserNoValid = await User.findById(genre.idUser);
    if (!idUserNoValid){
        return res.status(400).json({
            msg: 'El id de usuario no está registrado'
        });
    }

    // Guardar en BD
    await genre.save();
    
    // Genera el token para genre
    const token = await genJWT(genre._id);

    // Devuelve tanto el objeto genero como el token
    res.json({
        genre,
        token
    });
}

// borra un genero
async function deleteGenre(req = request, res = response){
    // obtenemos el id
    const id = req.params.id;
    
    // Obtenemos el genero
    const genre = await Genre.findById(id);
     
    // Mira si el genero existe
    if(!genre){
        return res.status(400).json({
            msg: 'El genero no está registrado'
        });
    }
     
    //  Obtenemos al usuario
    const user = await User.findById(genre.idUser)

    // Miramos si el usario es Admin
    if(user.rol != 'ADMIN'){
        return res.status(400).json({
            msg: 'No tiene permisos para borrar'
        });
    }
 
    // Borramos el genero
    await Genre.findByIdAndRemove(id)

    // Devuelve el genero borrado
    res.send(
        genre
    );
}

module.exports = {addGenre, getAllGenres, deleteGenre}