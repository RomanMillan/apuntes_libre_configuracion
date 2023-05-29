const { request, response} = require('express')
const jwt = require('jsonwebtoken');
const user = require('../models/user');

const validateJWT = async(req= request, res=response, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try{
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const user = await user.findById(uid)
        if(!user){
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe'
            })
        }
        if(!user.active){
            return res.status(401).json({
                msg: 'Token no válido - usuario deshabilitado' 
            })
        }
        req.uid = uid;
        next();
    }catch(error){
        return res.status(401).json({
            msg: error
        });

    }
}

module.exports = {validateJWT}