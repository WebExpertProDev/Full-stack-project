const router = require('express').Router();
const redis = require('redis');
const Joi = require('joi');
const Analytics = require('analytics-node');
const analytics = new Analytics(process.env.API_KEY_SEGMENT);
const DBM = require('../../../helpers/userDBM')

router.post('/signin', (req, res, next) => {  
  

  // if called by signup, username must present.
  const { email, username } = req.body;

  const validateSchema = Joi.object().keys({
    email: Joi.string().required(),
    username: Joi.string().required()
  });
  
  if (validateSchema.validate(req.body).errors !== undefined || null) {
    res.sendStatus(406);
    return;
  }
  const userDB = new DBM();
  userDB.signIn( email, username)
  .then( user => {
    res.send({userid: user._id});
})
.catch( err => res.sendStatus(500) );

})

module.exports = router;