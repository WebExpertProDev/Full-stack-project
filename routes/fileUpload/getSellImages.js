const router = require('express').Router();
const multer = require('multer');
const Analytics = require('analytics-node');
const analytics = new Analytics(process.env.API_KEY_SEGMENT);

const storage = multer.diskStorage({
  destination: './public/sellImages',
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({storage: storage});

router.post('/upload', upload.array('sellImages', 12), (req, res, next) => {
  res.send({
    message: 'success',
    filePath: req.files,
  });
  analytics.track({
    anonymousId: "Upload",
    event: 'Get Selling Images',
  });
});

module.exports = router;