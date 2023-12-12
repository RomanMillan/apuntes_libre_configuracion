# Crear tabla en BD en MongoDB

1. Tenemos que crear un archivo modelo (model) Ej.: user.js

2. Tenemos que importar la herramienta de mongoose (instalada con npm) `npm i monoose`

3. Requerimos : `{Schema, model}`

4. Despues creamos una constante con los datos que puede recibir la tabla

5. Por ultimo la exportarmos para que pueda ser llamada por el controlador y así poder crear la tabla y modificar los datos.

## Ejemplo de modelo

### model/user.js

```javascript
const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    email:{
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    },
    rol:{
        type: String,
        required: [true, 'El rol es obligatorio'],
        emun: ['ADMIN', 'USER']
    },
    active:{
        type: Boolean,
        default: true
    }
});

UserSchema.methods.toJSON = function() {
    const { __v, password, _id, ...usuario} = this.toObject();
    usuario.uid = _id;
    return usuario;
}

module.exports = model( 'User', UserSchema );
```

### controllers/user.js

```javascript
const User = require('../models/user');

/* Añadir un usuario nuevo a la BD */
async function addUser (req, res) {
    
    // Obtenemos los datos
    const { name, email, password, rol } = req.body;
    const newUser = new User({ name, email, password, rol });
    
    // Guardar en BD
    await newUser.save();

    // Envía una respuesta en formato JSON
    res.json({
        newUser
    });
}
```
