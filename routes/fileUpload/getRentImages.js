const router = require('express').Router();
const multer = require('multer');
const Analytics = require('analytics-node');
const analytics = new Analytics(process.env.API_KEY_SEGMENT);

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
  analytics.track({
    anonymousId: "Upload",
    event: 'Get Renting Images',
  });
});

module.exports = router;