const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const updateImageCloud = async (req = request, res = response) => {
    if (!req.files || Object.keys(req.files).length === 0) {
      res.status(400).send('No files were uploaded.');
      return;
    }
    const { collection, id } = req.params;
    let model;
    try {
      switch (collection) {
        case "users":
          model = await User.findById(id);
          break;
  
        case "monkey":
          model = await Monkey.findById(id);
          break;
      }
  
      //Si tiene atributo img y existe el fichero lo eliminamos
      if (model.img) {
        const nombreArr = model.img.split('/');
        const nombre = nombreArr[nombreArr.length - 1];
        const [public_id] = nombre.split('.');
        cloudinary.uploader.destroy(public_id);
      }
  
      const { tempFilePath } = req.files.file;
      const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
      model.img = secure_url;
      await model.save();
      res.status(200).json(model);
    } catch (msg) {
      return res.status(400).json({ msg });
    }
  };

  module.exports = {updateImageCloud}