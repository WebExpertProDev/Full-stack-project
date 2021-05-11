const router = require('express').Router();
const multer = require('multer');

const storage = multer.diskStorage({
  destination: './public/rentImages',
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({storage: storage});

router.post('/upload', upload.array('rentImage', 10), (req, res, next) => {
  res.send({
    message: 'success',
    filePath: req.files,
  });
});

module.exports = router;