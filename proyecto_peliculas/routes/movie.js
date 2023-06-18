const express = require('express');
const router = express.Router();

const{getMovie, addMovie, updateMovie, getAllMovies, deleteMovie} = require('../controllers/movie');

const { check } = require('express-validator');
const validarCampos = require('../middleware/validate-fields');
const{validateJWT}= require('../middleware/validate-jwt');


// obtener todas las peliculas
router.get('/', getAllMovies);

// obtener una pelicula
router.get('/:id',[
    check('id','No existe la pelicula').isMongoId(),
    validarCampos
],getMovie)

/* Añadir pelicula */
router.post('/', [
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('idGenre').not().isEmpty(),
    validarCampos
],addMovie);

// actualizar pelicula
router.put('/:id',[
    validateJWT,
    check('id','No existe la pelicula').isMongoId(),
    validarCampos
],updateMovie)

// borrar pelicula
router.delete('/:id',[
    validateJWT,
    check('id','No existe la pelicula').isMongoId(),
    validarCampos
],deleteMovie)

module.exports = router;
