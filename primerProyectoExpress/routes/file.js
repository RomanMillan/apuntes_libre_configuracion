const express = require('express');
const router = express.Router();
const {upload} = require('../controller/file');
const {updateImageCloud} = require('../controller/fileCloudinary');

router.post('/',upload);
router.post('/updateImageCloud',updateImageCloud);

module.exports = router;