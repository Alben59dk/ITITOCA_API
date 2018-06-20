const multer = require('multer')
const crypto = require('crypto')

function createUpload(dest) {
  let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, dest)
    },
    filename: function (req, file, cb) {
      let name = crypto.createHash('md5').update(file.originalname).digest("hex");
      cb(null, name + '-' + Date.now())
    }
  })

  return multer({
    storage: storage,
    fileFilter: function(req, file, cb) {
      if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return cb(new Error('Only image files are allowed!'));
      }
      cb(null, true);
    }
  })
}

module.exports = createUpload