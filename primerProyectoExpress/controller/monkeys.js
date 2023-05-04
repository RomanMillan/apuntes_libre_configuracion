const Monkey = require('../models/monkeys');
const User = require('../models/user');
const {genJWT} = require('../helpers/genJWT');
const { request, response } = require('express');

// Muestra todos los monos
 async function getAllMonkeys(req = request, res = response){
    const {country, type} = req.query
    let monkeys;
    if(!country && !type){
        monkeys = await Monkey.find({});
    }else if(country && !type){
        monkeys = await Monkey.find({country});
    }else if(!country && type){
        monkeys = await Monkey.find({type});
    }else{
        monkeys = await Monkey.find({type, country});
    }
    
    if(monkeys.length === 0){
        return res.status(400).json({
            msg: 'No se ha encontrado ningún mono'
        });
    }

    res.send(
        monkeys
    )
}

// Añade un mono (Genera un token)
async function addMonkey(req = request, res = response) {
    const { name, country, type, descripcion , rolMonkey, idUser} = req.body;
    const monkey = new Monkey({ name, country, type, descripcion, rolMonkey, idUser });

    // Validar si existe el nombre
    const nameNoValid = await Monkey.findOne({name});
    if (nameNoValid){
        return res.status(400).json({
            msg: 'El nombre ya está registrado'
        });
    }

    // Validar si existe el id de usuario
    const idUserNoValid = await User.findById(monkey.idUser);
    if (!idUserNoValid){
        return res.status(400).json({
            msg: 'El id de usuario no está registrado'
        });
    }

    // Guardar en BD
    await monkey.save();
    
    // Genera el token para Monkey
    const token = await genJWT(monkey._id);

    // Devuelve tanto el objeto monkey como el token
    res.json({
        monkey,
        token
    });
}

// Actualiza un mono
async function updateMonkey(req = request, res = response){
    // obtenemos los datos
    const id = req.params.id;
    const monkeyUpdate = req.body;
    
    // Validar si existe el nono
    const idNoValid = await Monkey.findById(id);
    if (!idNoValid){
        return res.status(400).json({
            msg: 'El mono no está registrado'
        });
    }

    // Actualizamos Monkey
    await Monkey.findByIdAndUpdate(id,monkeyUpdate);

    // Obtenemos el objeto actualizado
    const monkeyUpdated = await Monkey.findById(id);

    // Devuelve el objeto actualizado
    res.json({
        monkeyUpdated
    });
}

// Muestra un mono
async function getMonkey(req = request, res = response){
    // obtenemos los datos
    const id = req.params.id;
     
    // Obtenemos el mono
    const monkey = await Monkey.findById(id);
    
    // Mira si el mono existe
    if(!monkey){
        return res.status(400).json({
            msg: 'El mono no está registrado'
        });
    }

    // Devuelve el mono 
    res.send(
        monkey
    );
}

// Borra un mono
async function deleteMonkey(req = request, res = response){
    // obtenemos los datos
    const id = req.params.id;
    
    // Obtenemos el mono
    const monkey = await Monkey.findById(id);
     
    // Mira si el mono existe
    if(!monkey){
        return res.status(400).json({
            msg: 'El mono no está registrado'
        });
    }
     
    //  Obtenemos al usuario
    const user = await User.findById(monkey.idUser)

    // Miramos si el usario es Admin
    if(user.rol != 'ADMIN'){
        return res.status(400).json({
            msg: 'No tiene permisos para borrar'
        });
    }
 
    // Borramos el mono
    await Monkey.findByIdAndRemove(id)

    // Devuelve el mono borrado
    res.send(
        monkey
    );
}

module.exports = {addMonkey, updateMonkey, getMonkey, deleteMonkey, getAllMonkeys}