# Crear un validador personalizado

Para crear un validador personalizado o propio, tendremos que crearnos un archivo .js en nuestra carpeta helpers.

### helpers/db_validators.js

```javascript
const Rol = require('../models/rol')

const isValidRol = async (rol = '')=> {
    const existeRol = await Rol.findOne({ rol })
          if (!existeRol) {
              throw new Error(`Rol ${rol} not exists in database`)
          }
}
module.exports= {isValidRol}
```

Este es un validador de ejemplo, donde lo validamos es si el rol del usuario es correcto segun nuestro criterio.

### routes/user.js

```javascript
//importaciones
const { check } = require('express-validator');
const {isValidRol} =require('../helpers/db_validators');

/* Añadir usuario */
router.post('/',[
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'Password must be between 6 and 12 characters').isLength({ min: 6 }).isLength({max:12}),
    check('email', 'El correo no es válido').isEmail(),
    check('rol').custom(isValidRol),
    validarCampos
],addUser);
```

Tenemos que importar a perte de nuestro validador el express-validator.

`check('rol').custom(isValidRol)`

Con la función: `custom() `podemos insertar nuestro validador.
