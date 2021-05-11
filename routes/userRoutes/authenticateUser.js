const router = require('express').Router()
const redis = require('redis');
const client = redis.createClient(process.env.REDIS_PORT);
const Joi = require('joi');
const UserModel = require('../../Schemas/UserSchema');
const Generator = require('../../helpers/Generator');
const DBM = require('../../helpers/DBM');

router.post('/auth', (req, res, next) => {
  const sign = new Generator();
  const DB = new DBM()
  const { phone, code } = req.body;
  const validateSchema = Joi.object().keys({
    code: Joi.string().required()
  });
  
  if (validateSchema.validate(req.body).errors !== undefined || null) {
    res.sendStatus(406);
  }

  // ? Read the user
  client.get(phone, (error, reply) => {
    if (error) {
      res.sendStatus(500);
    } else {
      if (code === reply) {
        sign.generate(phone)
        .then(token => {
          DB.addEntity(UserModel, {phone, token})
            .then(newUser => res.status(200).send(newUser))
            .catch(error => res.status(503).send(error.message));
        })
        .catch(error => res.status(503).send(error.message));
        // res.send({phone: phone, code: reply});
      } else {
        res.sendStatus(404);
      }
    }
  });
})

module.exports = router;