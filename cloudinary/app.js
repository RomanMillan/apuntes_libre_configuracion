const express = require('express')
const cloudinary = require('cloudinary').v2
const fileUpload = require('express-fileupload')

const app = express();

// middleware
app.use(express.json())
app.use(fileUpload({
    useTempFiles : true
}))

cloudinary.config({
    cloud_name:'dnbj5b6nr',
    api_key: '492539587623228',
    api_secret: 'au05kT0a2255Eg33CBuBzf13ZBE',
})

app.post('/',async(req,res)=>{
    try {
        
        const file = req.files.image;
        console.log(file)
         const result = await cloudinary.uploader.upload(file.tempFilePath,{
            folder:'images'
        })
    
        res.json(result)
    } catch (error) {
        console.log('noy hay un archivo sobudo')
        res.json()
    }
})

app.listen(3500,()=>{
    console.log('Servidor escuchadno en el 3500')
})