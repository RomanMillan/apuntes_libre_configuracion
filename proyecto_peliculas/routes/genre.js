const express = require('express');
const router = express.Router();

const{getAllGenres, getGenre, addGenre, deleteGenre, updateGenre} = require('../controllers/genre');

const { check } = require('express-validator');
const validarCampos = require('../middleware/validate-fields');
const{validateJWT}= require('../middleware/validate-jwt');

// obtener todos los generos
router.get('/', getAllGenres);

// obtener genero
router.get('/:id',[
    check('id','No existe el genero').isMongoId(),
    validarCampos
], getGenre);

/* Añadir genero */
router.post('/',[
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
],addGenre);

// Modificar genero
router.put('/:id',[
    validateJWT,
    check('id','No existe el genero').isMongoId(),
    validarCampos
] ,updateGenre);

// Borrar genero
router.delete('/:id',[
    validateJWT,
    check('id','No existe el genero').isMongoId(),
    validarCampos
] ,deleteGenre);



module.exports = router;
