const multer = require("multer");
/*
    Modulo path para manejar las rutas tanto realtivas como absolutas de nuestar PC y de
    nuestro proyecto
 */
const path = require("path");

// Multer config
module.exports = multer({
  // Para indicar a multer donde guardar el archivo. (Vacío, porque será en clodinary)
  storage: multer.diskStorage({}),
  // función para controlar que archivos serán aceptados
  fileFilter: (req, file, cb) => {
    // originalname : Es el nombre del archivo en la pc del usuario
    let ext = path.extname(file.originalname);
    
    // la función debe llamar a 'cb' usando una variable de tipo boolean
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
        // si el archivo es denegado.
      cb(new Error("Tipo de archivo no soportado"), false);
      return;
    }
    // si es aceptado
    cb(null, true);
  },
});