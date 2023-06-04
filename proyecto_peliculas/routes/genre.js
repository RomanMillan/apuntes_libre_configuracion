const express = require('express');
const router = express.Router();

const{addGenre, getAllGenres, deleteGenre} = require('../controllers/genre');

const { check } = require('express-validator');
const validarCampos = require('../middleware/validate-fields');
const{validateJWT}= require('../middleware/validate-jwt');

// obtener todos los generos
router.get('/', getAllGenres);

/* Añadir genero */
router.post('/add',[
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('idUser').not().isEmpty(),
    validarCampos
],addGenre);

// Borrar mono
router.delete('/:id',[
    validateJWT,
    check('id','No existe el genero').isMongoId(),
    validarCampos
] ,deleteGenre);



module.exports = router;
