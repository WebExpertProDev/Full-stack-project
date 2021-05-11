const router = require('express').Router();
const Joi = require('joi');
const HomeDBM = require('../../helpers/homeDBM');
const DBM = require('../../helpers/DBM')
const CreaModel = require('../../Schemas/CreaSchema')
const Analytics = require('analytics-node');
const { query } = require('express');
const analytics = new Analytics(process.env.API_KEY_SEGMENT);
router.post('/addHomeListing', (req, res, next) => {

  let { rentPerTime, rentPerUnit, propertyTaxes, maintenanceFee, forRent, views, description, historyPrice, image, isAvailable, dateListed, agentID, availabilityDate, hasAI, hasAIAndAgent, streetAddress, city, province, postalCode, latAndLong, openHouseDate, overview, propertyFeatures, utilities, nearby, securityDeposit, mlsNumber, isMLSListed} = req.body;
  // console.log(req.body);

  const validateSchema = Joi.object().keys({
    forRent: Joi.boolean(),
    rentPerUnit: Joi.string().allow(""),
    rentPerTime: Joi.string().allow(""),
    views: Joi.string().allow(""),
    description: Joi.string().allow(""),
    historyPrice: Joi.array().allow(""),
    image:Joi.array(),
    isAvailable: Joi.boolean(),
    dateListed: Joi.string().allow(""),
    agentID: Joi.array(),
    availabilityDate: { start: Joi.string(), end: Joi.string() },
    hasAI: Joi.boolean(),
    hasAIAndAgent: Joi.boolean(),
    propertyTaxes: Joi.string().allow(""),
    maintenanceFee: Joi.string().allow(""),
  
    streetAddress: Joi.string().allow(""),
    city: Joi.string().allow(""),
    province: Joi.string().allow(""),
    postalCode: Joi.string().allow(""),
    latAndLong: { lat: Joi.string(), Long: Joi.string() }, // ? should be subdocument
    
    openHouseDate: {
      start: Joi.string().allow("") ,
      end: Joi.string().allow("") ,
    },
    overview: {
      propertyType: Joi.string().allow(""),
      yearBuilt: Joi.string().allow(""),
      size: Joi.string().allow(""),
      bedroomCount: Joi.string().allow(""),
      bathroomCount: Joi.string().allow(""),
      parkingCount: Joi.string().allow(""),
    },
    propertyFeatures: {
      swimmingPool: Joi.boolean(),
      elevator: Joi.boolean(),
      petFriendly: Joi.boolean(),
      parking: Joi.boolean(),
      airConditioning: Joi.boolean(),
      balcony: Joi.boolean(),
      bbq: Joi.boolean(),
      ensuitLandry: Joi.boolean(),
      furnished: Joi.boolean(),
      bicycleParking: Joi.boolean(),
      securitySystem: Joi.boolean(),
      reconstructed: Joi.boolean(),
      gym: Joi.boolean(),
      hardwoodFloors: Joi.boolean(),
      garden: Joi.boolean(),
      more: Joi.string().allow("")
    },
    utilities: {
      hydro: Joi.boolean(),
      heat: Joi.boolean(),
      electricity: Joi.boolean(),
      gas: Joi.boolean(),
      tvOrCable: Joi.boolean(),
    },
    nearby: {
      School: Joi.array(),
      Bank: Joi.array(),
      Foodservice: Joi.array(),
      Parks: Joi.array(),
      Stores: Joi.array(),
      Others: Joi.array(),
    },
    securityDeposit: Joi.string().allow(""),
    mlsNumber: Joi.string().allow(""),
    isMLSListed: Joi.boolean()
  });

  if (validateSchema.validate(req.body).error !== undefined || null) {
    res.sendStatus(406);
    console.log(validateSchema.validate(req.body).error);
    return;
  }

  // ? DBM Instance
  const homeDBM = new HomeDBM();
  const DB = new DBM();
  const query = { 
    "Address.StreetAddress": streetAddress,
    "Address.City": city,
    "Address.Province": province,
    "Address.PostalCode": postalCode
  }

  DB.getOneEntity(CreaModel, query)
    .then( result => {
      if (result){
        isMLSListed = true;
        mlsNumber = result.ListingID;
        propertyType = result.PropertyType;
        const agents = [];
        if (Array.isArray(result.AgentDetails)){
          result.AgentDetails.forEach( i => agents.push(i["@ID"]) );
        } else {
          agents.push(result.AgentDetails["@ID"]);
        }
        agentID = agents;
      }
    })
    .then( dummy => {

      homeDBM.addListings({ rentPerTime, rentPerUnit, propertyTaxes, maintenanceFee, forRent, views, description, historyPrice, image, isAvailable, dateListed, agentID, availabilityDate, hasAI, hasAIAndAgent, streetAddress, city, province, postalCode, latAndLong, openHouseDate, overview, propertyFeatures, utilities, nearby, securityDeposit, mlsNumber, isMLSListed})
        .then(data => res.send(data))
        .catch(error => res.send(error.message));
    
        analytics.identify({
          anonymousId: postalCode,
          traits: {
            availabilityDate: availabilityDate,
          },
          timestamp: new Date(),
        });
        analytics.track({
          anonymousId: postalCode,
          event: 'Added Home Listing',
        });
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
      return;
    });

  
});


module.exports = router;