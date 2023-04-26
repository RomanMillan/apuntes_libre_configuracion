const express = require('express')
const router = express.Router()
const { check } = require('express-validator')


router.post('/login',[
    check('email','Email is invalid').isEmail(),
    check('password','Password is mandatory').not().isEmpty(),
    validateFields
] ,login)



module.exports = router