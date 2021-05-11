const router = require('express').Router();
const DBM = require('../../helpers/homeDBM');
const HomeModel = require('../../Schemas/homeSchema');
const Analytics = require('analytics-node');
const Joi = require('joi');
const analytics = new Analytics(process.env.API_KEY_SEGMENT);

router.post('/getHomeListings', (req, res, next) => {
  const { forRent, position } = req.body;

  const validateSchema = Joi.object().keys({
    forRent: Joi.boolean(),
    position: Joi.array()
  });
  console.log(req.body)
  console.log(validateSchema.validate(req.body).error);
  if (validateSchema.validate(req.body).error !== undefined || null) {
    res.sendStatus(406);
    return;
  }
  function distance(lat1, lon1, lat2, lon2) {
    var p = 0.017453292519943295;    // Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p)/2 + 
            c(lat1 * p) * c(lat2 * p) * 
            (1 - c((lon2 - lon1) * p))/2;
    return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
  }
  const sortByDistance = ( list, points) => {
    const sorter = (a,b) => distance(a.latAndLong.lat, a.latAndLong.Long,points[0], points[1]) - distance(b.latAndLong.lat, b.latAndLong.Long,points[0], points[1]);
    list.sort(sorter);
  }


  const DB = new DBM();
  DB.getListEntities(HomeModel, { forRent })
    .then(result => {
      if (!result){
      res.sendStatus(404);
      return Promise.reject();
  } else{
      sortByDistance(result, position)
      res.send(result);
      return;
  }
})
    .catch(error => res.sendStatus(404));
  analytics.track({
    anonymousId:'Home Request',
    event: 'Get Home Listing',
  });
});


module.exports = router;