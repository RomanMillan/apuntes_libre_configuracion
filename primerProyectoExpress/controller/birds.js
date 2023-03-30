const db = require('diskdb');
db.connect('data', ['birds.json']);

/* devuelve todos los pajaros */
const getBirds = (req, res)=>{
   const birds = db.birds.find();
    res.json(birds);
};

/* devuelve el pajaro pedido */
const getBird = (req, res)=>{
    const nameParam = req.params.name; 
    const bird = db.birds.findOne({name:nameParam});
    if(bird != null){
        res.json(bird);
    }else{
        res.status(400).send(`El pajaro ${nameParam} no ha sido encontrado`);
    }
};

/* borrar el pajaro pedido */
const deleteBird = (req,res)=>{
    const nameParam = req.params.name;
    const bird = db.birds.findOne({name:nameParam});
    if(bird != null){
        db.birds.remove({name:nameParam})
        res.send(`El pajaro ${nameParam} ha sido borrado`);
    }else{
        res.status(400).send(`El pajaro ${nameParam} no ha sido encontrado`);
    }
};

/* añadir nuevo pajaro */
const addBird = (req,res)=>{
    const newBird = req.body;
    db.birds.save(newBird);
    res.send('Añadido pajaro')
}


module.exports = {
    getBirds, 
    getBird, 
    deleteBird,
    addBird
};