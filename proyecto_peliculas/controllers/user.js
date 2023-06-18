/* Importamos el modelo user y el encriptador de contraseñas */
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const {genJWT} = require('../helpers/genJWT');

// obtiene todos los usuarios
async function getUsers(req, res){
    const user = await User.find();
    if(user.lenght === 0){
        return res.status(400).json({
            msg: 'No se ha encontrado ningún usuario'
        });
    }
    res.send(user);
}

// obtiene un solo usuario
async function getUser(req, res){
    const id = req.params.id;
    const  user = await User.findById(id);
    if(!user){
        return res.status(400).json({
         msg : 'El usuario no está registrado'
        })
     }
 
     res.send(
         user
     );
}

/* Añadir un usuario nuevo a la BD */
async function addUser (req, res) {
    
    // Obtenemos los datos
    const { name, email, password, rol } = req.body;
    const newUser = new User({ name, email, password, rol });

    //Validar si existe el nombre
    const nameNoValid = await User.findOne({name});
    if (nameNoValid){
        return res.status(400).json({
            msg: 'El nombre ya está registrado'
        });
    }

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

async function updateUser (req, res){
    const id = req.params.id;
    const idUser =  req.uid;
    const { name } = req.body;

    //Validar si existe el nombre
    const nameNoValid = await User.findOne({name});
    if (nameNoValid){
        return res.status(400).json({
            msg: 'El nombre ya está registrado'
        });
    }

    // Validar si existe el usuario
    const user = await User.findById(id);
    if (!user){
        return res.status(400).json({
            msg: 'El usuario no está registrado'
        });
    }

    // Validar que es el dueño de la cuenta
    if(id != idUser){
        return res.status(400).json({
            msg: 'No tienes permiso para modificar al usuario'
        });
    }

    //Lo combertimos a objeto
    const userUpdate = { 
        name : name
    }

    await User.findByIdAndUpdate(id, userUpdate);

    res.json({
        userUpdate
    });
}

/* Borrar usuario */
async function deleteUser(req,res){
    const id = req.params.id;
    const idUser = req.uid;      


    // Validar si existe el usuario
    const user = await User.findById(id);
    if (!user){
        return res.status(400).json({
            msg: 'El usuario no está registrado'
        });
    }

    // Validar que es el dueño de la cuenta
    if(id != idUser){
        return res.status(400).json({
            msg: 'No tienes permiso para borrar el usuario'
        });
    }


    const userDelete = await User.findByIdAndRemove(id)
    //const user = await User.findByIdAndUpdate(id,{"active": false});
    
    res.json({
        userDelete
    });
}


/* Hace login */
async function login(req, res){
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        /* comprueba que el usuario existe */
        if(!user){
            return res.status(400).json({
                mensage:'El usuario no existe'
            });
        }else{
            /* comprueba que está activo */
            if(!user.active){
                return res.status(400).json({
                    msg:'El usuario no esta activo'
                });
            }else{
                const validPassword = bcryptjs.compareSync(password,user.password);
                /* comprueba que la contraseña es correcta */
                if(!validPassword){
                    return res.status(400).json({
                        mensage:'La contraseña no es correcta'
                    });
                }else{
                    //genera el token
                    const token = await genJWT(user._id);
                    res.json({
                        token,
                        msg:'Token generado correctamente'});   
                }
            }
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg:'Error inesperado'
        })
    }
}


module.exports = {getUsers, getUser, addUser, updateUser,  deleteUser, login};