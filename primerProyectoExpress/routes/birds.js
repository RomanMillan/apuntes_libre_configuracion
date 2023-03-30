const express = require('express');
const router = express.Router();
const {
    getBirds, 
    getBird, 
    deleteBird,
    addBird
} = require('../controller/birds.js');

// ruta raíz de este router
router.get('/',getBirds);
router.get('/:name',getBird);
router.get('/:name/delete',deleteBird);
router.post('/add',addBird)



// Exportamos el router para poder utilizarlo fuera
module.exports = router;