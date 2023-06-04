# Usar express-validator

Express-validator nos permite validar los campos y tener una capa de seguridad en nuestra aplicación.

Lo primero es instalarlo : `npm i express-validator`



### middleware/validate-fields.js

```javascript
const {validationResult} = require('express-validator');

const validarCampos = ( req, res, next ) => {
    const errors = validationResult(req)
    if( !errors.isEmpty() ){
        return res.status(400).json(errors);
    }
    next();
}

module.exports = validarCampos
```

Creamos un archivo validate-fields que nos servirá de middleware, esté tendrá una función flecha, que validará si el req está vacío, en caso afirmativo nos devolverá un error y se se seguirá ejecutando los demás procesos.

Si todo es correcto seguirá con la ejecución del validador.

Este middleware será llamado cuando queramos hacer un CRUD en rutas

Despues tenemos que importarlo donde vayamos a usarlo 

### routes/user.js

```javascript
// Importaci
const { check } = require('express-validator');
const validarCampos = require('../middleware/validate-fields');

/* Añadir usuario */
router.post('/',[
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'Password must be between 6 and 12 characters').isLength({ min: 6 }).isLength({max:12}),
    check('email', 'El correo no es válido').isEmail(),
    check('rol').custom(isValidRol),
    validarCampos
],addUser);

/* Borrar usuario */
router.delete('/:id',[
    validateJWT,
    check('id','No existe el usuario').isMongoId(),
    validarCampos
],deleteUser)
```

podemos ver que en el archivo de rutas llamamos hacemos uso del express-validator para validar los campos que queramos antes de enviarlos al controlador.

De esta manera nos aseguramos que no se envian campos incorrectos, evitando futuros errores en el controlador.

Con check tenemos que poner el nombre del campo a validar y un texto de respuesta si no pasa la validación. Ej. `check('name', 'El nombre es obligatorio')` depues llamamos a los métodos que usará check para validar ese campo. EJ: `.not().isEmpty()` 

Como podemos observar con `.custom()` podemos insertar nuestros propios validadores Ej. `.custom(isValidRol) `donde validamos el campo de rol, entre nuestra selección personal.

Si todo es correcto se llamará a la función del controlador correspondiente para seguir con la ejecución.


