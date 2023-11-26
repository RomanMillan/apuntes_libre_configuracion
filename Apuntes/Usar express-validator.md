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

---

## Validadores Personalizados

Con validate-fields no solo podemos validar con los validadores predefinidos, sino que podremos crear y usar nuestros propios validadores.

En el siguente ejemplo veremos como podemos crear validadores personalizados:

### helpers/db-validators.js

```js
const Client = require('../models/client')

const existsDni = async (dni) => {
    const dnilDb = await Client.findOne({dni});
      if (!dniInDb) {
        // DNI no existe en la base de datos
        return true;
    }

    // DNI ya existe en la base de datos
    throw new Error(`DNI ${dni} already exists in the database`);
}

module.exports = {existsDni}
```

Este es un archivo para añadir todos los validadores personalizados que queramos usar en nuestra aplicación.

En el ejemplo queremos validar que el nuevo cliente no inserta un dni que ya está registrado en la BD .

Para ello buscamos en la BD de la tabla Client que nos busque un cliente con ese dni, si lo encuentra enviamos un mensaje de error.

Siempre tendremos que enviar un true o false/exeption

### routes/client.js

```js
const { existsDni } = require('../helpers/db-validators');
// añadir cliente
router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('lastName', 'El apellido es obligatorio').not().isEmpty(),
    check('age', 'Tiene que ser mayor de edad').isInt({min:18}),
    check('country', 'El pais es obligatorio').notEmpty(),
    check('dni', 'El dni no es válido').isLength({min: 9, max: 9}),
    check('dni').custom(existsDni),
    validateFields
],addClient);
```

En el archivo de rutas de cliente tendremos que importar o requerir del archivo con nuestras funciones personalizadas y con `.custom(existsDni)` agregar la función validadora en el campo que queramos validar.

Si el usuario inserta un dni ya registrado, nos saltará el menaje de error insertado anteriormente: *already exists in database*.

Si todo es correcto se llamará a la función del controlador correspondiente para seguir con la ejecución.
