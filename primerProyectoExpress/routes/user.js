const { Router } = require('express');
const { check } = require('express-validator');

router.post('/',[
    check('correo', 'El correo no es válido').isEmail()
], usuariosPost );