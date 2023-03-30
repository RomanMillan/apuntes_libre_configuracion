const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.send('página principal de monos');
})

router.get('/about',(req,res)=>{
    res.send('página sobre monos');
})

router.post('/singin',(req,res)=>{
    res.send('Registro correcto');
})

module.exports = router;