const User = require('../models/user');
const bcryptjs = require('bcryptjs');

const userPost = async(req, res = response) => {
    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.status(400).json(errors);
    }
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

    res.json({
        newUser
    });
}

module.export = {usersPost, }