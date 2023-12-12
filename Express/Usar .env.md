# Usar .env

Para usar el .env tenemos que instalarlo : `npm i dotenv`

despues creamos un archivo .env donde añadiremos todas las configuraciones que nos haga falta.

### .env

```dotenv
PORT=5800
MONGODB_CNN=mongodb+srv://dummy:Ap4HJ4l0kxyidc7K@cluster0.bqesogm.mongodb.net/peliculas
SECRETORPRIVATEKEY=Est03sMyPub1cK3y54@453
```

Como podemos ver en el ej. este archivo es para establecer conexiones, como el puerto con el que escuchará, la conexion con la BD MongoDB o el tipo de codificación para el generador de Token. 

Depues donde tengamos nuestro archivo principal tendremos que importarlo para poder usarlo.

### app.js

```javascript
/* usar el archivo .env */
require('dotenv').config();

/* Establece la conexión */
const PORT = process.env.PORT // obtenmos el puerto establecido en el archivo .env
app.listen(PORT,()=>{
    console.log(`escuchando en el puerto ${PORT}`);
})
```

Tambíen podemos crear un archvio de ejemplo para no mostrar las conexiones delicadas, como el enlace a la BD o el encriptador.
