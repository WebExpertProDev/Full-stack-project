const router = require('express').Router();
const Joi = require('joi');
const DBM = require('../../helpers/DBM');
const HomeModel = require('../../Schemas/homeSchema');
const Analytics = require('analytics-node');
const analytics = new Analytics(process.env.API_KEY_SEGMENT);
router.post('/incrementHomeView', (req, res, next) => {

    const { id } = req.body;
    console.log(id, "view")

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
            return;
        } else if (!house.isAvailable) {
            res.status(410).send("resource not available");

            return;
        } else{
            return DB.updateById(HomeModel, id, { views: (parseInt(house.views, 10) + 1).toString() })
        }
    })
    .then((house) => {
        res.sendStatus(200);
        return;
    })
    .catch(error => {
        res.status(500).send(error)
    });

    analytics.track({
        anonymousId: id,
        event: 'View home by ID',
    });
});

module.exports = router;