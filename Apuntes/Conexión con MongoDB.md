# Conexión con MongoDB

Para concectar con la BD de MongoDB tenmos que instalar una herramienta que permita ayudar a con la conexion. `npm i mongoose`

Tambíen tendremos que usar el .<mark>env</mark> para establecer la conexion con MongoDB

### .evn

```env
MONGODB_CNN=mongodb+srv://dummy:Ap4HJ4l0kxyidc7K@cluster0.bqesogm.mongodb.net/peliculas
```

Aquí establecemos cual es el enlace de la BD que se tiene que conectar nuesta aplicación.

### database/config.js

```javascript
// database/config.js
const mongoose = require('mongoose');
const dbConnection = async() => {
    try {
        await mongoose.connect( process.env.MONGODB_CNN);
        console.log('Base de datos online');
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la base de datos');
    }
}
module.exports = {
    dbConnection
}
```

En este archivo (config.js) hacemos la llamada a traves de una función flecha donde llamamos a la configuración del archivo .env y donde dependiendo de si es favorable o no la concexión , nos devolverá un mensaje por consola.

### app.js

```javascript
/* Conectando MongoDB */
const { dbConnection } = require('./database/config.js');
//await no se puede crear en el primer nivel 
// y por eso tiene que tener la funcion
async function connectAtlas(){ 
    await dbConnection();
}
connectAtlas();

```

Por último en nuestro archivo principal tendremos que hacer la llamada a la función flecha establecido en nuestro archivo config.js. 

Una vez que levantemos la aplicación automaticamtente llamará la función de config que a su vez llamará al archivo .env donde tenemos el enlace de conexión con MongoDB.
