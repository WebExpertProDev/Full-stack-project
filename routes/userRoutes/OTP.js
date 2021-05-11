const router = require('express').Router();
const redis = require('redis');
const client = redis.createClient(process.env.REDIS_PORT);
const Joi = require('joi');
const RandomeNumber = require('../../helpers/RandomNumberGenerator');

router.post('/getPhone', (req, res, next) => {  
  console.log('Is Redis Connected:', client.connected);
  
  const { phone } = req.body;
  const validateSchema = Joi.object().keys({
    phone: Joi.string().required()
  });
  
  if (validateSchema.validate(req.body).errors !== undefined || null) {
    res.sendStatus(406);
  }

  // ? Generate Code
  const random = new RandomeNumber();
  const code = random.generate();

  // ? Cash the code per user
  client.setex(phone, 180, code);
  client.get(phone, (error, reply) => {
    if (error) {
      res.sendStatus(500);
    } else {
      // TODO: Send code via sms here
      res.send({phone: phone, code: reply});
    }
  });
});

module.exports = router;
