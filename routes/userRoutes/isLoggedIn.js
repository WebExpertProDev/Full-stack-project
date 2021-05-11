const router = require('express').Router();
const redis = require('redis');
const client = redis.createClient(process.env.REDIS_PORT);
const Joi = require('joi');
const RandomeNumber = require('../../helpers/RandomNumberGenerator');
const Analytics = require('analytics-node');
const analytics = new Analytics(process.env.API_KEY_SEGMENT);
const DBM = require('../../helpers/userDBM')

router.post('/isLoggedIn', (req, res, next) => {  
  console.log('Is Redis Connected:', client.connected);
  
  const DB = new DBM();
  const { phone } = req.body;
  const validateSchema = Joi.object().keys({
    phone: Joi.string().required(),
  });

  if (validateSchema.validate(req.body).errors !== undefined || null) {
    res.sendStatus(406);
    return;
  }

  DB.isLoggedIn(phone)
    .then( status => {
        res.send({ isLoggedIn: status });
    })
    .catch( err => res.sendStatus(500) );

  analytics.identify({
    anonymousId: phone,
    timestamp: new Date(),
  });
  analytics.track({
    anonymousId: phone,
    event: 'IsLoggedIn USER',
  });

});

module.exports = router;