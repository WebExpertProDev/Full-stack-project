const router = require('express').Router();
const Joi = require('joi');
const DBM = require('../../helpers/DBM');
const HomeModel = require('../../Schemas/homeSchema');
const Analytics = require('analytics-node');
const analytics = new Analytics(process.env.API_KEY_SEGMENT);
router.post('/getHomeListingbyID', (req, res, next) => {

    const { id } = req.body;
    console.log(id, typeof id)

  const validateSchema = Joi.object().keys({
    id: Joi.string()
  });

  if (validateSchema.validate(req.body).error !== undefined || null) {
    res.sendStatus(406);
    return;
  }

  // ? DBM Instance
  const DB = new DBM();

  DB.getEntitybyID(HomeModel, id)
    .then(house => {

        if (!house){
            res.sendStatus(404);
            console.log(1);
            return;
        } else{

            if (!house.isAvailable) {
                res.status(410).send("resource not available");
            console.log(4);

                return;
            }
            res.send(house);
            console.log(3);

            return;
        }
    })
    .catch(error => {
        console.log(2);

        res.status(500).send(error)
    });

    analytics.track({
        anonymousId: id,
        event: 'Get home listing by id',
    });
});

module.exports = router;