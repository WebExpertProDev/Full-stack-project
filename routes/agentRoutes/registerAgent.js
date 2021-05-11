const router = require('express').Router();
const Joi = require('joi');
const AgentModel = require('../../Schemas/AgentSchema');
const DBM = require('../../helpers/DBM');
const { validate } = require('../../Schemas/AgentSchema');

router.post('/register', (req, res, next) => {
  const {username, password, name, family, registrationNumber, provinceOfRegistration, streetAddress, unitNumber, city, province, postalCode, latAndLong, dealsCountInYear, territories, isAgreedToRefrain, isAgreedToDualAgencyRefrain, isAgreedToNotToChargeClientsMore} = req.body;

  const validateSchema = Joi.object().keys({
    username: Joi.string(),
    password: Joi.string(),
    name: Joi.string(),
    family: Joi.string(),
    registrationNumber: Joi.string(),
    provinceOfRegistration: Joi.string(),
    streetAddress: Joi.string(),
    unitNumber: Joi.string(),
    city: Joi.string(),
    province: Joi.string(),
    postalCode: Joi.string(),
    latAndLong: Joi.string(),
    dealsCountInYear: Joi.string(),
    territories: Joi.string(),
    isAgreedToRefrain: Joi.boolean().strict(),
    isAgreedToDualAgencyRefrain: Joi.boolean().strict(),
    isAgreedToNotToChargeClientsMore: Joi.boolean().strict(),
  });

  if (validateSchema.validate(req.body).errors !== undefined || null) {
    res.status(406);
  }

  const DB = new DBM();
  DB.addEntity(AgentModel, {username, password, name, family, registrationNumber, provinceOfRegistration, streetAddress, unitNumber, city, province, postalCode, latAndLong, dealsCountInYear, territories, isAgreedToRefrain, isAgreedToDualAgencyRefrain, isAgreedToNotToChargeClientsMore})
    .then(result => res.status(200).send(result))
    .catch(error => res.status(503).send({'mongodb error': error.message}));
});

module.exports = router;