# Usar Express

Los primero que tenemos que hacer es descargar express desde npm `npm i express`

Despeus siempre que vayamos a usarlo tendremos que llamarlo.

## Ej. Importación de express en app principal

### app.js

```javascript
// importaciones
const express = require('express');
const app = express();
const user = require('./routes/user.js');

// middleware
app.use(express.json());

// accesos
app.use('/user',user);
```

Como podemos ver tenemos que crear una constante (express) para "almacenar" express, y una segunda constante (app) para guardar la llamada (express())

app será la constante que usaremos para dar acceso a nuestrar rutas. 

En los archivos de rutas (routes) tambien tenemos que importarlos, para usar la función de router.

### routes/user.js

```javascript
// importaciones
const express = require('express');
const router = express.Router();

/* Añadir usuario */
router.post('/',[
    check('name', 'El nombre es obligatorio').not().isEmpty(),
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
