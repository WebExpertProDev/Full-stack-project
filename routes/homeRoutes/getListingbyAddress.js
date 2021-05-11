const router = require('express').Router();
const Joi = require('joi');
const DBM = require('../../helpers/DBM');
const HomeModel = require('../../Schemas/homeSchema');
const Analytics = require('analytics-node');
const analytics = new Analytics(process.env.API_KEY_SEGMENT);
router.post('/getHomeListingbyAddress', (req, res, next) => {

    const { streetAddress, city, province, postalCode} = req.body;

  const validateSchema = Joi.object().keys({
    streetAddress: Joi.string(),
    city: Joi.string(),
    province: Joi.string(),
    postalCode: Joi.string(),
    date: { 
      start: Joi.string(),
      end: Joi.string()
    }
  });

  if (validateSchema.validate(req.body).error !== undefined || null) {
    res.sendStatus(406);
    return;
  }

  // ? DBM Instance
  const DB = new DBM();

  const query = { streetAddress, city, province, postalCode };

  DB.getOneEntity(HomeModel, query)
    .then(house => {
        if (!house){
            res.sendStatus(404);
            return Promise.reject();
        } else{
            if (!house.isAvailable) {
                res.status(410).send("resource not available");
                return;
            }
            res.send(house);
            return;
        }
    })
    .catch(error => res.status(500).send(error));

    analytics.track({
      anonymousId: postalCode,
      event: 'Get home listing by address',
    });
});


module.exports = router;