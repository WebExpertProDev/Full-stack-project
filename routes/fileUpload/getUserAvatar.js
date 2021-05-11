const router = require('express').Router();
const multer = require('multer');
const Analytics = require('analytics-node');
const analytics = new Analytics(process.env.API_KEY_SEGMENT);

const storage = multer.diskStorage({
  destination: './public/avatars',
  filename: async function (req, file, cb) {
    await cb(null, `${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({storage: storage});

router.post('/upload', upload.single('avatarImage'), async (req, res, next) => {
  await res.send({
    message: 'success',
    filePath: req.file,
  });

  analytics.track({
    anonymousId: "Upload",
    event: 'Get User Avatar',
  });
});

module.exports = router;