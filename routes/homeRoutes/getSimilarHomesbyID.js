const router = require('express').Router();
const Joi = require('joi');
const DBM = require('../../helpers/DBM');
const HomeModel = require('../../Schemas/homeSchema');
const Analytics = require('analytics-node');
const analytics = new Analytics(process.env.API_KEY_SEGMENT);

function distance(lat1, lon1, lat2, lon2) {
  var p = 0.017453292519943295;    // Math.PI / 180
  var c = Math.cos;
  var a = 0.5 - c((lat2 - lat1) * p)/2 + 
          c(lat1 * p) * c(lat2 * p) * 
          (1 - c((lon2 - lon1) * p))/2;

  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}

router.post('/getSimilarHomesbyID', (req, res, next) => {

  const { id } = req.body;
  console.log(id, typeof id)

  const validateSchema = Joi.object().keys({
    id: Joi.string()
  });

  if (validateSchema.validate(req.body).error !== undefined || null) {
    res.sendStatus(406);
    return;
  }

  let subjectLoc = null;
  let query = null;
  // ? DBM Instance
  const DB = new DBM();
  DB.getEntitybyID(HomeModel, id)
    .then( subject => {
      subjectLoc = subject.latAndLong;
      query = {
        "overview.propertyType": subject.overview.propertyType,
        "overview.bedroomCount": subject.overview.bedroomCount,
        "overview.bathroomCount": subject.overview.bathroomCount,
        forRent: subject.forRent
      }
      return DB.getEntity(HomeModel, query);
    })
    .then( listings => {
      let similar = []
      let listing;
      let avgPrice = 0;
      for (listing of listings){
        const loc1 = listing.latAndLong;
        if (distance(parseFloat(subjectLoc.lat, 10), parseFloat(subjectLoc.Long, 10), parseFloat(loc1.lat, 10), parseFloat(loc1.Long, 10)) <= 5){
          if (listing._id != id) {
            similar.push(listing);
            avgPrice += parseInt(listing.historyPrice[0], 10);
          }
        }
      }
      avgPrice /= similar.length;
      similar.sort((a,b) => (parseInt(a.historyPrice[0], 10) > parseInt(b.historyPrice[0], 10)) ? 1 : (((parseInt(a.historyPrice[0], 10) < parseInt(b.historyPrice[0], 10))) ? -1 : 0))
      similar = similar.slice(0,3);

      res.send({ similar, avgPrice })
      return;
    })
    .catch(error => res.sendStatus(404));
  analytics.track({
      anonymousId: id,
      event: 'Get similar homes by id',
  });
});

module.exports = router;