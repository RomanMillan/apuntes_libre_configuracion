const Movie = require('../models/movie');
const User = require('../models/user');
const Genre = require('../models/genre');
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

// obtiene una pelicula
async function getMovie(req = request, res = response){
    const id = req.params.id;
    
    const movie = await Movie.findById(id);
    if(!movie){
        return res.status(400).json({
            msg: 'No se ha encontrado la pelicula'
        });
    }

    res.send(
        movie
    )
}



// añade una pelicula
async function addMovie(req = request, res = response) {
    // obtenemos los datos
    const { name, year, duration, description, director, cover, idGenre } = req.body;
    const uid = req.uid;

    // Validar si existe el nombre (pelicula)
    const nameNoValid = await Movie.findOne({name});
    if (nameNoValid){
        return res.status(400).json({
            msg: 'El nombre ya está registrado'
        });
    }

    // Validar si existe el id de genero
    const idGenreNoValid = await Genre.findById(idGenre);
    if (!idGenreNoValid){
        return res.status(400).json({
            msg: 'El genero no está registrado'
        });
    }

    // Validar si existe el id de usuario
    const user = await User.findById(uid);
    if (!user){
        return res.status(400).json({
            msg: 'El usuario no está registrado'
        });
    }

    // Miramos si el usario es Admin
    if(user.rol != 'ADMIN'){
        return res.status(400).json({
            msg: 'No tiene permisos para añadir pelicula'
        });
    }

    // Combertimos a objeto
    const newMovie = {
        name : name,
        year : year,
        duration : duration,
        description : description,
        director : director,
        cover : cover,
        idUser : uid,
        idGenre : idGenre
    }
    
    // creamos una nueva pelicula
    const movie = new Movie(newMovie);

    // Guardar en BD
    await movie.save();
    

    // Devuelve el objeto pelicula
    res.json({
        movie
    });
}

// actualiza una pelicula
async function updateMovie(req = request, res = response){
    // obtenemos: uid (id usuario), id (id pelicula), datos a actualizar
    const uid = req.uid;
    const id = req.params.id;
    const { name, year, duration, description, director, cover, idGenre } = req.body;

    // Validar si existe el id del usuario
    const user = await User.findById(uid);
    if (!user){
        return res.status(400).json({
            msg: 'El usuario no está registrado'
        });
    }

    // Miramos si el usario es Admin
    if(user.rol != 'ADMIN'){
        return res.status(400).json({
            msg: 'No tiene permisos para añadir pelicula'
        });
    }

    // Obtenemos la pelicua
    const movie = await Movie.findById(id);

    // validar si la pelicula existe
    if(!movie){
        return res.status(400).json({
            msg: 'La pelicula no está registrada'
        });
    }

    // Validar si existe el id de genero
    if(idGenre != undefined){
        const idGenreNoValid = await Genre.findById(idGenre);
        if (!idGenreNoValid){
            return res.status(400).json({
                msg: 'El genero no está registrado'
            });
        }
    }

    // validar si al cambiar el nombre está repetido con otra pelicula
    if(name != movie.name){
        const nameNoValid = await Movie.findOne({name});
        if(nameNoValid){
            return res.status(400).json({
                msg: 'El nombre ya está registrado'
            })
        }
    }

    // Lo paso a un objeto
    const updateMovie = {
        name : name,
        year : year,
        duration : duration,
        description : description,
        director : director,
        cover : cover,
        idGenre : idGenre
    }
    // Actualizamos la pelicula
    const updatedMovie = await Movie.findByIdAndUpdate(id,updateMovie)

    // Devuelve el objeto pelicula
    res.json({
        updatedMovie
    });
}

// borra una pelicula 
async function deleteMovie(req = request, res = response){
    const uid = req.uid;
    const id = req.params.id;

    // Validar si existe el id del usuario
    const user = await User.findById(uid);
    if (!user){
        return res.status(400).json({
            msg: 'El usuario no está registrado'
        });
    }

    // Miramos si el usario es Admin
    if(user.rol != 'ADMIN'){
        return res.status(400).json({
            msg: 'No tiene permisos para añadir pelicula'
        });
    }

    // Obtenemos la pelicua
    const movie = await Movie.findById(id);

    // validar si la pelicula existe
    if(!movie){
        return res.status(400).json({
            msg: 'La pelicula no está registrada'
        });
    }

    // borramos la pelicula
    const deletedMovie = await Movie.findByIdAndDelete(id)

    // Devuelve el objeto pelicula borrado
    res.json({
        deletedMovie
    });

}

module.exports = {getMovie, addMovie, updateMovie, getAllMovies, deleteMovie}