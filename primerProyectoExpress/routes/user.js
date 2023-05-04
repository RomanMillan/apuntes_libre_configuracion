const express = require('express');
const router = express.Router();

const{addUser, deleteUser, login} = require('../controller/user');

const { check } = require('express-validator');
const validarCampos = require('../middleware/validate-fields');
const {isValidRol} =require('../helpers/db_validators');
const{validateJWT}= require('../middleware/validate-jwt');


/* Añadir usuario */
router.post('/',[
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'Password must be between 6 and 12 characters').isLength({ min: 6 }).isLength({max:12}),
    check('email', 'El correo no es válido').isEmail(),
    check('rol').custom(isValidRol),
    validarCampos
],addUser);

/* Borrar usuario */
router.delete('/:id',[
    validateJWT,
    check('id','No existe el usuario').isMongoId(),
    validarCampos
],deleteUser)

/* Hacer login */
router.post('/login',[
    check('email','El email es requerido').not().isEmpty(),
    check('password','El password es requerido').not().isEmpty(),
    validarCampos
],login)

module.exports = router;