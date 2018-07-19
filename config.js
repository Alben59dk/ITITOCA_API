const multer = require('multer')
const crypto = require('crypto')
const jwt = require('express-jwt');
const JWT_PERMISSIONS = require('express-jwt-permissions')({
  permissionsProperty: 'role'
})

const JWT_SECRET = process.env.SECRET

const JWT_MIDDLEWARE = jwt({secret: JWT_SECRET})

function createUpload(dest) {
  let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, dest)
    },
    filename: function (req, file, cb) {
      let name = crypto.createHash('md5').update(file.originalname).digest('hex');
      cb(null, name + '-' + Date.now())
    }
  })

  return multer({
    storage: storage,
    fileFilter: function(req, file, cb) {
      if (!file.originalname.match(/\.(jpg|jpeg|png|svg)$/)) {
        return cb(new Error('Only image files are allowed!'));
      }
      cb(null, true);
    }
  })
}

module.exports = {
  createUpload,
  JWT_SECRET,
  JWT_MIDDLEWARE,
  JWT_PERMISSIONS
}
