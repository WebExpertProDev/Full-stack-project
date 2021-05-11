const router = require('express').Router();
const multer = require('multer');
const Analytics = require('analytics-node');
const analytics = new Analytics(process.env.API_KEY_SEGMENT);

const storage = multer.diskStorage({
  destination: './public/contracts',
  filename: async function (req, file, cb) {
    await cb(null, `${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({storage: storage});

router.post('/upload', upload.array('contract', 1), async (req, res, next) => {
  await res.send({
    message: 'success',
    filePath: req.files,
  });
  analytics.track({
    anonymousId: "Upload",
    event: 'Get Contracts',
  });
});

module.exports = router;