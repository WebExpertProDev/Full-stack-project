const router = require('express').Router();
const Joi = require('joi');
const DBM = require('../../helpers/DBM');
const SellModel = require('../../Schemas/SellSchema');

router.post('/addSellListing', (req, res, next) => {
  const {houseTitle, hasAI, hasAIAndAgent, size, bedRoomCount, bathRoomCount, parkingCount, availabilityDate, mlsNumber, isMLSListed} = req.body;

  const validateSchema = Joi.object().keys({
    houseTitle: Joi.string(),
    hasAI: Joi.boolean().strict(),
    hasAIAndAgent: Joi.boolean().strict(),
    size: Joi.string(),
    bedRoomCount: Joi.string(),
    bathRoomCount: Joi.string(),
    parkingCount: Joi.string(),
    availabilityDate: Joi.string(),
    mlsNumber: Joi.string(),
    isMLSListed: Joi.boolean().strict(),
  });
  console.log(validateSchema.validate(req.body).error);
  if (validateSchema.validate(req.body).error !== undefined || null) {
    res.sendStatus(406);
  }

  const DB = new DBM();
  DB.addEntity(SellModel, {houseTitle, hasAI, hasAIAndAgent, size, bedRoomCount, bathRoomCount, parkingCount, availabilityDate, mlsNumber, isMLSListed})
    .then(result => res.send(result))
    .catch(error => res.sendStatus(406));
});

module.exports = router;