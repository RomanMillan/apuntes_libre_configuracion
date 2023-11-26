# Manejar Tokens

Tenemos que instalar: `npm i jsonwebtoken`

### .env

```env
SECRETORPRIVATEKEY=Est03sMyPub1cK3y54@453
```

En el archivo .env insertamos el tipo de codificación que queremos usar, y de esa manera irá generando los token.

### helpers/genJWT.js

```javascript
const jwt = require('jsonwebtoken');

const genJWT =(uid = '')=>{
    return new Promise( (resolve, reject) =>{
        const payload = {uid};
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY,{
            expiresIn: '4h'
        }, (err,token)=>{
            if(err){
                console.log(err)
                reject('No se pudo generar el jwt')
            }else{
                resolve(token)
            }
        })
    })
}

module.exports={genJWT}
```

En nuestra carpeta helpers creamos un archivo .js para configurar el token.

Tenemos que llamar a la herramienta de token insatalada previamente y al formato de codificación configurado en el archivo .env

En este archivo (genJWT) podemos configurar entre otras cosas cuento tiempo le damos para que expire el token y un mensaje de error.

No podemos olvidar exportar exportar la función flecha, para poder llamarla desde otros archivos.

### controllers/user.js

En el controlador tenemos que usar el token, para generarlo y también comprobar si es correcto el token

```javascript
//importacion
const {genJWT} = require('../helpers/genJWT');

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
```

En la función de hacer login a parte de otras muchas comprobaciónes de si el usuario existe , esta activo y comprorar que la constrseña es correcta. 

Si todo está correcto por último generamos el token, llamando a la función del archivo genJWT.js y una vez generado se lo pasamos, para que el usuario pueda copiarlo y usarlo posteriormente cuando se le pida.

### middleware/validate-jwt.js

```javascript
const { request, response} = require('express')
const jwt = require('jsonwebtoken');
const user = require('../models/user');

const validateJWT = async(req= request, res=response, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try{
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const user = await user.findById(uid)
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
        /* 
            Con esto retornamos el uid (id del usuario)
            Y podemos obtener al usuario y verificar si es él, etc.
            En el controllador podemos obtenerlo.
            ej: const id = req.uid;
        */
        req.uid = uid;
        next();
    }catch(error){
        return res.status(401).json({
            msg: error
        });

    }
}

module.exports = {validateJWT}
```

Creamos un validador de token en nuestra carpeta middleware ya que se ejecutará antes de hacer otros procesos.

Esta función flecha requiere (req) por el header el token y es llamado x-token : 

 `const token = req.header('x-token');`

comprobamos que el token no está vacío , que es correcto, que el usuario existe y que el usuario está activo y no deshabilitado.

Obtenemos al usuario a travez del token

```javascript
const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const user = await user.findById(uid)
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
```

Al verificar si el token es válido nos devuelve el token y nosotros por medio de la desestructuración solo obtenemos el uid con el cual buscaremos al usuario.

### routes/user.js

```javascript
//importaci
const{validateJWT}= require('../middleware/validate-jwt');

/* Borrar usuario */
router.delete('/:id',[
    validateJWT,
    check('id','No existe el usuario').isMongoId(),
    validarCampos
],deleteUser)
```

Este es un ejemplo de como podemos usar el token y pedirselo al usuario logeado.

Para asegurarnos de que el usuario es el dueño de la cuenta y no alguien que le ha robado su nombre y contraseña. Le pedimos el token (generado la primera vez que hace login).
