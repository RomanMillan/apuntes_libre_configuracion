const express = require('express');
const router = express.Router();

const{addMovie, getAllMovies, deleteMovie} = require('../controllers/movie');

const { check } = require('express-validator');
const validarCampos = require('../middleware/validate-fields');
const{validateJWT}= require('../middleware/validate-jwt');

// obtener todas las peliculas
router.get('/', getAllMovies);

/* Añadir pelicula */
router.post('/add',[
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('idUser').not().isEmpty(),
    check('idGenre').not().isEmpty(),
    validarCampos
],addMovie);


module.exports = router;
