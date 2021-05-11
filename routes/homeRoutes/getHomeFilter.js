const router = require('express').Router();
const Joi = require('joi');
const DBM = require('../../helpers/homeDBM');
const HomeModel = require('../../Schemas/homeSchema');
const Analytics = require('analytics-node');
const analytics = new Analytics(process.env.API_KEY_SEGMENT);
router.post('/getHomeFilter', (req, res, next) => {

const { forRent, bedRoomCount, bathRoomCount, parkingCount, minprice, maxprice, propertyFeatures, position} = req.body;

  const validateSchema = Joi.object().keys({
    forRent: Joi.boolean(),
    bedRoomCount: Joi.string(),
    bathRoomCount: Joi.string(),
    parkingCount: Joi.string(),
    minprice: Joi.number(), 
    maxprice: Joi.number(),
    propertyFeatures: Joi.array().items(Joi.object()),
    position: Joi.array()

  });
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


  // ? DBM Instance
  const DB = new DBM();
  const query ={ forRent};

  //The if statement provide the ability of the user to send some aspect of the data to be chosen
  if (bedRoomCount != "All"){
    query["overview.bedroomCount"] = bedRoomCount;
  }
  if (bathRoomCount != "All"){
    query["overview.bathroomCount"] = bathRoomCount;
  }
  if (parkingCount != "All"){
    query["overview.parkingCount"] = parkingCount;
  }
  if (minprice != maxprice){
    query["historyPrice.0"] = {$gte: minprice, $lte: maxprice};
  }
  propertyFeatures.forEach(e => query["propertyFeatures."+e.schematitle] = e.status);
  

  // const query = { bedRoomCount, bathRoomCount, parkingCount,price:{$gte: minprice, $lte: maxprice}  };
  // , propertyFeatures:{swimmingPool, elevator, petFriendly, parking, airConditioning, balcony, bbq, ensuitLandry, furnished, bicycleParking, securitySystem, reconstructed, gym, hardwoodFloors}, propertyFeatures:{garden:true}
  // propertyFeatures:{swimmingPool, elevator, petFriendly, parking, airConditioning, balcony, bbq, ensuitLandry, furnished, bicycleParking, securitySystem, reconstructed, gym, hardwoodFloors, garden:true}
  console.log(query);
  DB.getListEntities(HomeModel, query)
    .then(house => {
        if (!house){
            res.sendStatus(404);
            return Promise.reject();
        } else{
            sortByDistance(house, position)
            res.send(house);
            return;
        }
    })
    .catch(error => res.status(500).send(error));

    analytics.track({
      anonymousId: "Test",
      event: 'Get rent listing by address',
    });
});


module.exports = router;