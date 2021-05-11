const router = require('express').Router();
const Joi = require('joi');
const DBM = require('../../helpers/DBM');
const TourModel = require('../../Schemas/TourSchema');
const Analytics = require('analytics-node');
const analytics = new Analytics(process.env.API_KEY_SEGMENT);
router.post('/addTour', (req, res, next) => {

    const { streetAddress, city, province, postalCode, homeCount, date, hasAgent } = req.body;

  const validateSchema = Joi.object().keys({
    streetAddress: Joi.string(),
    city: Joi.string(),
    province: Joi.string(),
    postalCode: Joi.string(),
    homeCount: Joi.string(),
    date: { 
      start: Joi.string(),
      end: Joi.string()
    },
    hasAgent: Joi.boolean()
  });

  if (validateSchema.validate(req.body).error !== undefined || null) {
    res.sendStatus(406);
    return;
  }

  // ? DBM Instance
  const DB = new DBM();

  DB.addEntity(TourModel, { streetAddress, city, province, postalCode, homeCount, date, hasAgent })
    .then(data => res.send(data))
    .catch(error => res.status(500).send(error.message));

    analytics.identify({
      anonymousId: postalCode,
      timestamp: new Date(),
    });
    analytics.track({
      anonymousId: postalCode,
      event: 'Added Tour',
    });
});


module.exports = router;