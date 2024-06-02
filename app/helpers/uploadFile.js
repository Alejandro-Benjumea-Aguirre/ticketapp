const multer = require('multer')

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../../uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  }
});

// Create the multer instance
const upload = multer(
  { storage, 
    limits: {fileSize: 250000},
    fileFilter: function(req, file, cb) {
      const extenciones = [jpeg, png, xls, xlsx, csv, pdf, doc, txt, text, plain, jpg]

      let fileMime = file.mimetype.split('/')

      let fileExt = fileMime[fileMime.length - 1]

      if(extenciones.includes(fileExt)){
        cb(null, true)
      }else{
        cb(new Error (`El archivo ${file.originalname} tiene una extención invalida`))
      }

    }
  })

module.exports = upload;