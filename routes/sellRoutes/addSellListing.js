// NO LONGER IN USE

// const router = require('express').Router();
// const Joi = require('joi');
// const DBM = require('../../helpers/DBM');
// const SellModel = require('../../Schemas/SellSchema');
// const Analytics = require('analytics-node');
// const analytics = new Analytics(process.env.API_KEY_SEGMENT);
// router.post('/addSellListing', (req, res, next) => {
//   const {price,image,isAvailable, agentID, houseTitle,streetAddress, unitNumber, city, province, postalCode, propertyType, hasAI, hasAIAndAgent, size, bedRoomCount,propertyFeatures,utilities, bathRoomCount, parkingCount, availabilityDate, mlsNumber, isMLSListed,latAndLong} = req.body;

//   const validateSchema = Joi.object().keys({
//     price: Joi.string(),
//     image: Joi.string(),
//     isAvailable: Joi.boolean(), 
//     agentID: Joi.string(),
//     houseTitle: Joi.string(),
//     hasAI: Joi.boolean().strict(),
//     hasAIAndAgent: Joi.boolean().strict(),
//     size: Joi.string(),
//     bedRoomCount: Joi.string(),
//     bathRoomCount: Joi.string(),
//     parkingCount: Joi.string(),
//     availabilityDate: Joi.string(),
//     mlsNumber: Joi.string(),
//     isMLSListed: Joi.boolean().strict(),
//     latAndLong: Joi.object({
//       lat : Joi.string().strict(),
//       Long : Joi.string().strict()
//     }),
//     streetAddress: Joi.string(),
//     unitNumber: Joi.string(),
//     city: Joi.string(),
//     province: Joi.string(),
//     postalCode: Joi.string(),
//     propertyType: Joi.string(),
//     openHouseDate: Joi.object({
//       start: Joi.string(),
//       end: Joi.string(),
//     }),
//     propertyFeatures: Joi.object({
//       swimmingPool: Joi.boolean().strict(),
//       elevator: Joi.boolean().strict(),
//       petFriendly: Joi.boolean().strict(),
//       parking: Joi.boolean().strict(),
//       airConditioning: Joi.boolean().strict(),
//       balcony: Joi.boolean().strict(),
//       bbq: Joi.boolean().strict(),
//       ensuitLandry: Joi.boolean().strict(),
//       furnished: Joi.boolean().strict(),
//       bicycleParking: Joi.boolean().strict(),
//       securitySystem: Joi.boolean().strict(),
//       reconstructed: Joi.boolean().strict(),
//       gym: Joi.boolean().strict(),
//       hardwoodFloors: Joi.boolean().strict(),
//       garden: Joi.boolean().strict(),
//     }),
//     utilities: Joi.object({
//       hydro: Joi.boolean().strict(),
//       heat: Joi.boolean().strict(),
//       water: Joi.boolean().strict(),
//       internet: Joi.boolean().strict(),
//       tvOrCable: Joi.boolean().strict(),
//     }),
//   });

//   console.log(validateSchema.validate(req.body).error);
//   if (validateSchema.validate(req.body).error !== undefined || null) {
//     res.sendStatus(406);
//   }

//   const DB = new DBM();
//   DB.addEntity(SellModel, {price,image,isAvailable, agentID,houseTitle, hasAI, hasAIAndAgent,streetAddress, unitNumber, city, province, postalCode, propertyType, size,utilities, propertyFeatures, bedRoomCount, bathRoomCount, parkingCount, availabilityDate, mlsNumber, isMLSListed,latAndLong})
//     .then(result => res.send(result) )
//     .catch(error => res.sendStatus(406));
//     analytics.identify({
//       anonymousId: houseTitle,
//       traits: {
//         availabilityDate: availabilityDate,
//       },
//       timestamp: new Date(),
//     });
//     analytics.track({
//       anonymousId: houseTitle,
//       event: 'Sell listing Added',
//     });
// });

// module.exports = router;