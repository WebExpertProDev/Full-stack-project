const router = require('express').Router();
const redis = require('redis');
const Joi = require('joi');
const Analytics = require('analytics-node');
const analytics = new Analytics(process.env.API_KEY_SEGMENT);
const DBM = require('../../helpers/userDBM')

router.post('/signOut', (req, res, next) => {  
  

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

  // const DB = new DBM();
  // // ? Generate Code
  // DB.getUser(phone)
  // .then( user => {
  // if (!user){
  //     return Promise.reject();
  // } else{
  //   console.log(req.body)
  //   return DB.logOut(phone);
  // }
  // })
  // .then( dummy => {
  //   res.sendStatus(200);
  //  } )
  // .catch( err => {
  //   res.sendStatus(500);
  // })



  // for testing purpose, use:
  res.sendStatus(200);


  analytics.identify({
    anonymousId: phone,
    timestamp: new Date(),
  });
  analytics.track({
    anonymousId: phone,
    event: 'Sign out USER',
  });
});

module.exports = router;
