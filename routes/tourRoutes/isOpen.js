const router = require('express').Router();
const Joi = require('joi');
const DBM = require('../../helpers/DBM');
const HomeModel = require('../../Schemas/homeSchema');
const Analytics = require('analytics-node');
const analytics = new Analytics(process.env.API_KEY_SEGMENT);
router.post('/isOpen', (req, res, next) => {

    const { streetAddress, city, province, postalCode, date } = req.body;

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
                res.send({ isOpen: false });
                return;
            }
            const start = new Date(house.openHouseDate.start);
            const end = new Date(house.openHouseDate.end);
            if ( start <= new Date(date.start) <= new Date(date.end) <= end){
                res.send({ isOpen: true });
            } else{
                console.log(123);
                res.send({ isOpen: false });
            }
            return;
        }
    })
    .catch(error => res.status(500).send(error.message));

    analytics.identify({
      anonymousId: postalCode,
      timestamp: new Date(),
    });
    analytics.track({
      anonymousId: postalCode,
      event: 'Checked isOpen',
    });
});


module.exports = router;