const {request, response} = require('express')
const User = require('../models/usuario')
const bcryptjs = require('bcryptjs')

const login = (req = request, res = response) => {



    res.json({
        msg: 'Login ok'
    })
}

module.exports = {
    login
}