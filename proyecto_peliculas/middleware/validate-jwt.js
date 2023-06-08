const { request, response} = require('express')
const jwt = require('jsonwebtoken');
const User = require('../models/user')


const validateJWT = async(req= request, res=response, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try{
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const user = await User.findById(uid)
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
        // Esto envía el uid (id del usuario) y pude ser obtenido poniendo en la
        // función:  const uid = req.uid
        // con ello podemos sacar tanto el usuario, como comprobar si es es correcto, etc
        req.uid = uid;

        next();
    }catch(error){
        return res.status(401).json({
            msg: error
        });

    }
}

module.exports = {validateJWT}