const { request, response } = require('express')
const {uploadFile} = require('../helpers/upload-file')

const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: "dnbj5b6nr",
    api_key: "492539587623228",
    api_secret: "au05kT0a2255Eg33CBuBzf13ZBE"
  });

const upload = async(req, res = response) => {

    try {

        const name = await uploadFile( req.files, undefined, 'imgs' );
        res.json({ name });

    } catch (msg) {
        res.status(400).json({ msg });
    }

}
module.exports = {upload}