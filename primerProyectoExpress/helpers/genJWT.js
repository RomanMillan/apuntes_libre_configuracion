const jwt = require('jsonwebtoken');

const genJWT =(uid = '')=>{
    return new Promise( (resolve, reject) =>{
        const payload = {uid};
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY,{
            expiresIn: '4h'
        }, (err,token)=>{
            if(err){
                console.log(err)
                reject('No se pudo generar el jwt')
            }else{
                resolve(token)
            }
        })
    })
}

module.exports={genJWT}
