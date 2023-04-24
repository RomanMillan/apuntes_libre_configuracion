/* Importamos el modelo user y el encriptador de contraseñas */
const User = require('../models/user');
const bcryptjs = require('bcryptjs');

/* Añadir un usuario nuevo a la BD */
const userPost = async(req, res) => {
    
    // Obtenemos los datos
    const { name, email, password, rol } = req.body;
    const newUser = new User({ name, email, password, rol });
    
    //Validar si existe el email
    const emailNoValid = await User.findOne({email});
    if (emailNoValid){
        return res.status(400).json({
            msg: 'El correo ya está registrado'
        });
    }
    
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    newUser.password = bcryptjs.hashSync( password, salt );

    // Guardar en BD
    await newUser.save();

    // Envía una respuesta en formato JSON
    res.json({
        newUser
    });
}

module.export = {userPost}