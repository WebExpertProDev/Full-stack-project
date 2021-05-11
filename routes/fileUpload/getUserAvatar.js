const router = require('express').Router();
const multer = require('multer');

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
});

module.exports = router;