const Movie = require('../models/genre');
const User = require('../models/user');
const Genre = require('../models/genre');
const {genJWT} = require('../helpers/genJWT');
const { request, response } = require('express');



// obtener todos las peliculas
async function getAllMovies(req = request, res = response){
    const movie = await Movie.find();
    
    if(movie.length === 0){
        return res.status(400).json({
            msg: 'No se ha encontrado ninguna pelicula'
        });
    }

    res.send(
        movie
    )
}

// añade una pelicula
async function addMovie(req = request, res = response) {
    const { name, year, duration, description, director, cover, idUser, idGenre} = req.body;
    const movie = new Movie({ name, year, duration, description, director, cover, idUser, idGenre });

    // Validar si existe el nombre
    const nameNoValid = await Movie.findOne({name});
    if (nameNoValid){
        return res.status(400).json({
            msg: 'El nombre ya está registrado'
        });
    }

    // Validar si existe el id de usuario
    const idUserNoValid = await User.findById(movie.idUser);
    if (!idUserNoValid){
        return res.status(400).json({
            msg: 'El id de usuario no está registrado'
        });
    }

    // Validar si existe el id de genero
    const idGenreNoValid = await Genre.findById(movie.idGenre);
    if (!idGenreNoValid){
        return res.status(400).json({
            msg: 'El id del genero no está registrado'
        });
    }

    // Guardar en BD
    await movie.save();
    
    // Genera el token para la pelicula
    const token = await genJWT(movie._id);

    // Devuelve tanto el objeto genero como el token
    res.json({
        movie,
        token
    });
}

module.exports = {addMovie, getAllMovies}