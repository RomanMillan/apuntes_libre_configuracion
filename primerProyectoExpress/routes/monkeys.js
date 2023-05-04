const express = require('express');
const router = express.Router();
const {addMonkey, updateMonkey, getMonkey, deleteMonkey, getAllMonkeys} = require('../controller/monkeys');

const { check } = require('express-validator');
const {isValidRolMonkey} =require('../helpers/db_validators_monkey');
const validarCampos = require('../middleware/validate-fields');
const{validateJWT}= require('../middleware/validate-jwt');

// Obtener todos los monos
router.get('/',getAllMonkeys);

// Añadir mono
router.post('/add',[
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('country', 'El pais es obligatorio').not().isEmpty(),
    check('type', 'El tipo es obligatorio').not().isEmpty(),
    check('description', 'La descripción supera el maximo de 20 caracteres').isLength({max:20}),
    check('rolMonkey').custom(isValidRolMonkey),
    check('idUser').not().isEmpty(),
    validarCampos
],addMonkey);

// Actualizar mono
router.put('/:id',[
    validateJWT,
    check('id','No existe el mono').isMongoId(),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('country', 'El pais es obligatorio').not().isEmpty(),
    check('type', 'El tipo es obligatorio').not().isEmpty(),
    check('description', 'La descripción supera el maximo de 20 caracteres').isLength({max:20}),
    check('rolMonkey').custom(isValidRolMonkey),
    check('idUser').not().isEmpty(),
    validarCampos
],updateMonkey);

// Mostrar mono
router.get('/:id',[
    check('id','No existe el mono').isMongoId(),
    validarCampos
] ,getMonkey);

// Borrar mono
router.delete('/:id',[
    validateJWT,
    check('id','No existe el mono').isMongoId(),
    validarCampos
] ,deleteMonkey);


module.exports = router;