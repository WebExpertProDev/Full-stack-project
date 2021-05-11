const router = require('express').Router();
const Joi = require('joi');
const RentDBM = require('../../helpers/rentDBM');

router.post('/addRentListing', (req, res, next) => {

  const { availabilityDate, streetAddress, unitNumber, city, province, postalCode, propertyType, latAndLong, openHouseDate, start, end, propertyFeatures, swimmingPool, elevator, petFriendly, parking, airConditioning, balcony, bbq, ensuitLandry, furnished, bicycleParking, securitySystem, reconstructed, gym, hardwoodFloors, garden, utilities, hydro, heat, water, internet, tvOrCable, nearby, bank, bike, trails, cafe, gasStation, localGym, hospital, school, pool, park, publicTranspport, restaurant, shopping, dogParks, monthlyRent, securityDeposit, mlsNumber, isMLSListed } = req.body;

  const validateSchema = Joi.object().keys({
    availabilityDate: Joi.string(),
    streetAddress: Joi.string(),
    unitNumber: Joi.string(),
    city: Joi.string(),
    province: Joi.string(),
    postalCode: Joi.string(),
    propertyType: Joi.string(),
    latAndLong: Joi.string(), // ? should be subdocument
    openHouseDate: Joi.object({
      start: Joi.string(),
      end: Joi.string(),
    }),
    propertyFeatures: Joi.object({
      swimmingPool: Joi.boolean().strict(),
      elevator: Joi.boolean().strict(),
      petFriendly: Joi.boolean().strict(),
      parking: Joi.boolean().strict(),
      airConditioning: Joi.boolean().strict(),
      balcony: Joi.boolean().strict(),
      bbq: Joi.boolean().strict(),
      ensuitLandry: Joi.boolean().strict(),
      furnished: Joi.boolean().strict(),
      bicycleParking: Joi.boolean().strict(),
      securitySystem: Joi.boolean().strict(),
      reconstructed: Joi.boolean().strict(),
      gym: Joi.boolean().strict(),
      hardwoodFloors: Joi.boolean().strict(),
      garden: Joi.boolean().strict(),
    }),
    utilities: Joi.object({
      hydro: Joi.boolean().strict(),
      heat: Joi.boolean().strict(),
      water: Joi.boolean().strict(),
      internet: Joi.boolean().strict(),
      tvOrCable: Joi.boolean().strict(),
    }),
    nearby: Joi.object({
      bank: Joi.boolean().strict(),
      bike: Joi.boolean().strict(),
      trails: Joi.boolean().strict(),
      cafe: Joi.boolean().strict(),
      gasStation: Joi.boolean().strict(),
      localGym: Joi.boolean().strict(),
      hospital: Joi.boolean().strict(),
      school: Joi.boolean().strict(),
      pool: Joi.boolean().strict(),
      park: Joi.boolean().strict(),
      publicTranspport: Joi.boolean().strict(),
      restaurant: Joi.boolean().strict(),
      shopping: Joi.boolean().strict(),
      dogParks: Joi.boolean().strict(),
      grocery: Joi.boolean().strict(),
    }),
    monthlyRent: Joi.string(),
    securityDeposit: Joi.string(),
    mlsNumber: Joi.string(),
    isMLSListed: Joi.boolean().strict(),
  });

  if (validateSchema.validate(req.body).error !== undefined || null) {
    res.sendStatus(406);
  }

  // ? DBM Instance
  const DBM = new RentDBM();

  DBM.addListings({availabilityDate, streetAddress, unitNumber, city, province, postalCode, propertyType, latAndLong, openHouseDate, start, end, propertyFeatures, swimmingPool, elevator, petFriendly, parking, airConditioning, balcony, bbq, ensuitLandry, furnished, bicycleParking, securitySystem, reconstructed, gym, hardwoodFloors, garden, utilities, hydro, heat, water, internet, tvOrCable, nearby, bank, bike, trails, cafe, gasStation, localGym, hospital, school, pool, park, publicTranspport, restaurant, shopping, dogParks, monthlyRent, securityDeposit, mlsNumber, isMLSListed})
    .then(data => res.send(data))
    .catch(error => res.send(error.message));
});


module.exports = router;