const router = require('express').Router();
const redis = require('redis');
const client = redis.createClient(process.env.REDIS_PORT);
const Joi = require('joi');
const RandomeNumber = require('../../helpers/RandomNumberGenerator');
const Analytics = require('analytics-node');
const analytics = new Analytics(process.env.API_KEY_SEGMENT);
const DBM = require('../../helpers/userDBM')

router.post('/getPhone', (req, res, next) => {  
  console.log('Is Redis Connected:', client.connected);
  

  console.log(req.body)
  // if called by signup, username must present.
  const { phone, username } = req.body;

  const validateSchema = Joi.object().keys({
    phone: Joi.string().required(),
    username: Joi.string().optional()
  });
  
  if (validateSchema.validate(req.body).errors !== undefined || null) {
    res.sendStatus(406);
    return;
  }

  const DB = new DBM();
  // ? Generate Code
  // const random = new RandomeNumber();
  // const code = random.generate();
  // change this after SMS is ready :)
  const code = 123456

  // ? Cash the code per user
  client.setex(phone, 180, code);
  client.get(phone, (error, reply) => {
    if (error) {
      res.sendStatus(500);
    } else {
      // TODO: Send code via sms here
      DB.getUser(phone)
        .then( user => {
          if (!user){
            return [DB.addUser({userType: "SMS", phone: phone, isLoggedIn: true, username}), username];
          } else{
            return [DB.logIn(phone), user.username];
          }
        })
        .then( foo => {
          res.send({phone: phone, code: code, username: foo[1]})
        })
        .catch( err => {
          res.sendStatus(500);
        })
    }
  });

  console.log(phone, username)

  // for testing purpose, use:
  // res.send({phone:phone, code: "123456", username: "mersen", userid: "60335898064c1d3fe452ceee"})


  analytics.identify({
    anonymousId: phone,
    timestamp: new Date(),
  });
  analytics.track({
    anonymousId: phone,
    event: 'OTP USER',
  });
});

module.exports = router;
