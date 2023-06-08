const Genre = require('../models/genre');
const User = require('../models/user');
const { request, response } = require('express');


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

// obtener un genero
async function getGenre(req = request, res = response){
    const id = req.params.id;

    const genre = await Genre.findById(id);
    
    if(!genre){
       return res.status(400).json({
        msg : 'El genero no está registrado'
       })
    }

    res.send(
        genre
    );
}

// añadir un genero
async function addGenre(req = request, res = response) {
    // obtengo el nombre y el uid (id del usuario)
    const { name } = req.body;
    const idUser =  req.uid;
     
    // Validar si existe el nombre
    const nameNoValid = await Genre.findOne({name});
    if (nameNoValid){
        return res.status(400).json({
            msg: 'El nombre ya está registrado'
        });
    }
    
    // Validar si existe el id de usuario
    const user = await User.findById(idUser);
    if (!user){
        return res.status(400).json({
            msg: 'El id de usuario no está registrado'
        });
    }

    // Validar si el usario es ADMIN
    if(user.rol != 'ADMIN'){
        return res.status(400).json({
            msg: 'No tienes permisos para añadir'
        });
    }
    
    // Guardar en BD
    const genre = new Genre({ name, idUser });
    await genre.save();
    
    // Devuelve tanto el objeto genero
    res.json({
        genre
    });
}

// actualizar genero
async function updateGenre(req = request, res = response){
    // obtenemos el id (genero), uid(id del usuario) y body
    const id = req.params.id;
    const idUser =  req.uid;
    const { name }  = req.body;
    
    // Obtenemos el genero
    const genre = await Genre.findById(id);
    
    // validar si el genero existe
    if(!genre){
        return res.status(400).json({
            msg: 'El genero no está registrado'
        });
    }

    // Validar si está repetido
    const nameNoValid = await Genre.findOne({name});
    if (nameNoValid){
        return res.status(400).json({
            msg: 'El nombre ya está registrado'
        });
    } 
    
    //  Obtenemos al usuario
    const user = await User.findById(idUser)
    
    // Miramos si el usario es Admin
    if(user.rol != 'ADMIN'){
        return res.status(400).json({
            msg: 'No tiene permisos para borrar'
        });
    }
    
    //Lo combertimos a objeto
    const genreUpdate = {name : name}
    
    // Actualizamos el genero
    await Genre.findByIdAndUpdate(id, genreUpdate)

    // Devuelve el genero actualizado
    res.send(
        genreUpdate
    );

}

// borrar un genero
async function deleteGenre(req = request, res = response){
    // obtenemos el id y uid(id del usuario)
    const id = req.params.id;
    const idUser =  req.uid;

    // Obtenemos el genero
    const genre = await Genre.findById(id);
     
    // Mira si el genero existe
    if(!genre){
        return res.status(400).json({
            msg: 'El genero no está registrado'
        });
    }
     
    //  Obtenemos al usuario
    const user = await User.findById(idUser)

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

module.exports = {getAllGenres, getGenre, addGenre, deleteGenre, updateGenre}