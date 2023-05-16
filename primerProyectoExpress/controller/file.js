const { request, response } = require('express')
const {uploadFile} = require('../helpers/upload-file')

const upload = async(req, res = response) => {

    try {

        const name = await uploadFile( req.files, undefined, 'imgs' );
        res.json({ name });

    } catch (msg) {
        res.status(400).json({ msg });
    }

}
module.exports = {upload}