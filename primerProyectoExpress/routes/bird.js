const express = require('express');
const router = express.Router();

const {addBirdData} = require('../controller/bird.js');

router.post('/',addBirdData);

module.exports = router;