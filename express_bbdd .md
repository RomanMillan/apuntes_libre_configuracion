
## NODE.JS // EXPRESS (CONEXIÓN A BBDD)

### Sin BBDD
#### Esta es la manera más fácil de hacer un servidor que responda peticiones de parte del usuario.
**app.js**

* Importamos express y creamos una constante app del framework de express.
	```javascript
	const express = require('express');
	const app = express();
	```

* Ya podemos crear todas las rutas de acceso con sus respuesta. ponemos app. seguido del método por el cual atenderá (get, post, delete) y entre parentesis: 1. la ruta y despues con función flecha cogemos los datos (req) en el caso de ser post o put y una respuesta (res) para que el navegador no se quede procesando eternamente.

    ```javascript
    app.get('/',(req,res)=>{
        res.send('Esta es la página principal');
    });

    app.get('/json',(req,res)=>{
        res.json({"Cancion":"La macarena"});
    });

    app.post('/registro',(req,res)=>{
        res.send("El usuario a sido registrado");
    })
    ```

* Creamos la constante PORT la cual llamaremos al archivo ==.env== llamando a la clave PORT (clave=valor). Esta constante guardará el puerto a usar. Despues con app.listen() insertamos el puerto. Y también podemos crear una función flecha para indicar que el servidor está escuchando por el puerto x
    ```javascript
    const PORT = process.env.PORT

    app.listen(PORT,()=>{
        console.log(`escuchando en el puerto ${PORT}`);
    })
	```

### Con BBDD Simple (DISKDB)
#### Manera que se asemeja a la definitiva.

**terminal**
Tenemos que instalar el diskdb
`npm i diskdb`

**app.js**

* Importamos: express y .env (archivo de configuración)

    ```javascript
    const express = require('express');
    const app = express();
    require('dotenv').config(); // para importar el archivo .env
    ```
* Tenemos que crear un middleware, para que podamos obtener los datos que nos envia en formato JSON antes de poder trabajar con ellos.
	```javascript 
	app.use(express.json())
	```
* Creamos la ruta.
	```typescript
	app.use('/birds',birds);
	```
* Creamos el escuchador para que podamos hacer peticiones.
```javascript
const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`escuchando en el puerto ${PORT}`);
})
```

**birds.js (routes)**
* Creamos una carpeta routes y en ella un archivo birds.js
	```javascript
	const express =  require('express');
	const router = express.Router();

	const  { getBirds, getBird, deleteBird, addBird, updateBird }  =  require('../controller/birds.js');

	router.get('/',getBirds); // ruta raíz
	router.get('/:name',getBird);
	router.get('/:name/delete',deleteBird);
	router.post('/add',addBird);
	router.put('/update',updateBird)  

	// Exportamos el router para poder utilizarlo fuera
	module.exports = router;
	```
    
**birds.js (controller)**

* Creamos la carpeta controller y el archivo birds.js 
	```javascript
	const db =  require('diskdb'); //importamos la base de datos
	db.connect('data', ['birds.json']); //conectamos con la bbdd manual

	/* devuelve todos los pajaros */
	const  getBirds  =  (req,  res)=>{
		const birds = db.birds.find();
		res.json(birds);
	};

	/* devuelve el pajaro pedido */
	const  getBird  =  (req,  res)=>{
		const nameParam = req.params.name;
		const bird = db.birds.findOne({name:nameParam});
		if(bird !=  null){
			res.json(bird);
		}else{
			res.status(400).send(`El pajaro ${nameParam} no ha sido encontrado`);
		}
	};

	/* borrar el pajaro pedido */
	const  deleteBird  =  (req,res)=>{
		const nameParam = req.params.name;
		const bird = db.birds.findOne({name:nameParam});
		if(bird !=  null){
			db.birds.remove({name:nameParam})
			res.send(`El pajaro ${nameParam} ha sido borrado`);
		}else{
			res.status(400).send(`El pajaro ${nameParam} no ha sido encontrado`);
		}
	};

	/* añadir nuevo pajaro */
	const  addBird  =  (req,res)=>{
		const newBird = req.body;
		db.birds.save(newBird);
		res.send('Añadido pajaro')
	}

	/* actualizar pajaro */
	const  updateBird  =  (req,res)  =>{
		const updateBird = req.body;
		const idBird = updateBird._id;
		const bird = db.birds.findOne({_id:idBird});
		db.birds.update(bird,updateBird);
		res.send('pajaro Actualizado')
	}

	module.exports =  {getBirds, getBird, deleteBird, addBird, updateBird};
	```

**birds.js (data)**
* Creamos una carpeta llamada data y un archivo birds.js donde simularemos una base de datos
	``[]``
	Para que funcione tiene que tener al menos un array vacío.

**db.js (models)**
* Creamos una carpeta llamada models y un archivo db.js.
	```javascript
	const db =  require('diskdb');
	db.connect('../data', ['birds','monkeys']);
	```
	Aquí definiremos el modelo de como se guardará los datos en la base de datos creada anteriormente. 
	En este caso estamos diciendo que usaremos birds y monkeys, situados en la carpeta data

**.env**
* Archivo especial para definir de forma general "actitudes".
En definiremos el puerto y la ruta de la base de datos a la que se tiene que conectar.
``PORT=5800``

### Con BBDD (MONGODB)
#### La manera definitiva (profesional).
**app.js**

* Importamos express y creamos una constante app del framework de express.
	```javascript
	const express = require('express');
	const app = express();
	```

* Ya podemos crear todas las rutas de acceso con sus respuesta. ponemos app. seguido del método por el cual atenderá (get, post, delete) y entre parentesis: 1. la ruta y despues con función flecha cogemos los datos (req) en el caso de ser post o put y una respuesta (res) para que el navegador no se quede procesando eternamente.
	```javascript
	async  function  connectAtlas(){  //await no se puede crear en el primer nivel y por eso tiene que tner la funcion
		await  dbConnection();
	}

	connectAtlas()
	app.use(express.json())
	app.use('/birdData',birdData)
	```


* Creamos la ruta de escucha
	```javascript
   const PORT = process.env.PORT
   app.listen(PORT,()=>{
       console.log(`escuchando en el puerto ${PORT}`);
   })
	```

**bird.js (routes)**
* Creamos una carpeta routes y en ella un archivo bird.js
	```javascript
	const express =  require('express');
	const router = express.Router();
	const  {addBirdData}  =  require('../controller/bird.js');
	
	router.post('/',addBirdData);

	module.exports = router;
	```

**bird.js (controller)**
* Creamos una carpeta controller y en ella un archivo bird.js
	```javascript
	const Bird =  require('../models/birds');
	
	// Tenemos que hacer la función async para poder utiilzar await dentro
	async  function  addBirdData(req  = request,  res  = response)  {
		// Obtenemos los datos del body, pero usamos la desestructuración de objetos para obtener solo los que nos interesan
		const  { name, country, habitat, descripcion }  = req.body;
		// Crearmos el objeto bird con el modelo importado
		const bird =  new  Bird({ name, country, habitat, descripcion });

		// Guardar en BD
		await bird.save();
		
		res.json({
			bird
		});
	}  

	module.exports =  {addBirdData};
	```

**birds.js (models)**
* Creamos una carpeta models y en ella un archivo birds.js, Este será el modelo que tendrá que ser guardado en la base de datos cada registro.
	```javascript
	const  { Schema, model }  =  require('mongoose');

	const BirdSchema =  Schema({
		name:  {
			type: String,
			required: [true,  'El nombre es obligatorio'],
			unique:  true
		},

		country:  {
			type: String,
			required: [true,  'El pais es obligatorio'],
		},

		habitat:  {
			type: String,
			required: [true,  'El hábitat es obligatorio'],
		},

		descripcion:  {
			type: String,
			required: [true,  'La descripción es obligatoria'],
		}

	});

	module.exports =  model( 'Bird', BirdSchema );
	```

**config.js (database)**
* Creamos una carpeta database y en ella un archivo config.js, Es un archivo para iniciar la base de datos de manera remota.

    ```javascript
    const mongoose =  require('mongoose');
    const  dbConnection  =  async()  =>  {
        try  {
            await mongoose.connect( process.env.MONGODB_CNN);
            console.log('Base de datos online');
        }  catch (error) {
            console.log(error);
            throw  new  Error('Error a la hora de iniciar la base de datos');
        }
    }

    module.exports = {dbConnection}
    ```

**.env**
* Archivo especial para definir de forma general "actitudes".
En definiremos el puerto y la ruta de la base de datos a la que se tiene que conectar.
``PORT=5800``
``MONGODB_CNN=``
