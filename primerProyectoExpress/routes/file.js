const express = require('express');
const router = express.Router();
const {upload} = require('../controller/file');

router.post('/',upload);

module.exports = router;