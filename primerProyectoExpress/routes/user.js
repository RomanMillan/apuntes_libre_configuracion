const { router } = require('express');
const { check } = require('express-validator');
const { userPost } = require('../controller/user');
const { validarCampos } = require('../middleware/validate-fields');

/* Validaciones medienate middleware en routes */
router.post('/',[
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'Password must be between 6 and 12 characters').isLength({ min: 6 }).isLength({ max: 12 }),
    check('email', 'El correo no es válido').isEmail(),
    check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    validarCampos
], userPost);

module.exports = {userPost};