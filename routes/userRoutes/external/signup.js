const router = require('express').Router();
const redis = require('redis');
const Joi = require('joi');
const Analytics = require('analytics-node');
const analytics = new Analytics(process.env.API_KEY_SEGMENT);
const DBM = require('../../../helpers/userDBM');

router.post('/signup', (req, res, next) => {  
  

  // if called by signup, username must present.
  const {userType, email, username } = req.body;

  const validateSchema = Joi.object().keys({
    userType: Joi.string().required(),
    email: Joi.string().required(),
    username: Joi.string().required(),
    
  });
  
  if (validateSchema.validate(req.body).errors !== undefined || null) {
    res.sendStatus(406);
    return;
  }
  const userDB = new DBM();
  userDB.addUser({userType, email, username})
  .then(result => res.send(result))
  .catch(error => res.send(error.message));
})

module.exports = router;