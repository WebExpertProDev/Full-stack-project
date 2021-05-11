const router = require('express').Router();
const DBM = require('../../helpers/DBM');
const HomeModel = require('../../Schemas/homeSchema');

router.post('/getMarketAvgPrice', (req, res, next) => {

  /* format: 
  {
    forRent: { type: Boolean, required: true }, 
    overview: {
        propertyType: { type: String, required: true },
        yearBuilt: { type: String, required: true },
        size: { type: String, required: true },
        bedroomCount: { type: String, required: true },
        bathroomCount: { type: String, required: true },
        parkingCount: { type: String, required: true },
    },
    propertyFeatures: {
        swimmingPool: { type: Boolean, default: false },
        elevator: { type: Boolean, default: false },
        petFriendly: { type: Boolean, default: false },
        parking: { type: Boolean, default: false },
        airConditioning: { type: Boolean, default: false },
        balcony: { type: Boolean, default: false },
        bbq: { type: Boolean, default: false },
        ensuitLandry: { type: Boolean, default: false },
        furnished: { type: Boolean, default: false },
        bicycleParking: { type: Boolean, default: false },
        securitySystem: { type: Boolean, default: false },
        reconstructed: { type: Boolean, default: false },
        gym: { type: Boolean, default: false },
        hardwoodFloors: { type: Boolean, default: false },
        garden: { type: Boolean, default: false },
        more: { type: String, default: "" }
    },
    utilities: {
        hydro: { type: Boolean, default: false },
        heat: { type: Boolean, default: false },
        electricity: { type: Boolean, default: false },
        gas: { type: Boolean, default: false },
        tvOrCable: { type: Boolean, default: false },
    },
  }
  */
  const query = {
    "overview.propertyType": req.body.overview.propertyType, 
    "overview.yearBuilt": req.body.overview.yearBuilt, 
    "overview.size": req.body.overview.size, 
    "overview.bedroomCount": req.body.overview.bedroomCount, 
    "overview.bathroomCount": req.body.overview.bathroomCount, 
    "overview.parkingCount": req.body.overview.parkingCount, 
    "propertyFeatures.swimmingPool": req.body.propertyFeatures.swimmingPool,
    "propertyFeatures.elevator": req.body.propertyFeatures.elevator,
    "propertyFeatures.petFriendly": req.body.propertyFeatures.petFriendly,
    "propertyFeatures.parking": req.body.propertyFeatures.parking,
    "propertyFeatures.airConditioning": req.body.propertyFeatures.airConditioning,
    "propertyFeatures.balcony": req.body.propertyFeatures.balcony,
    "propertyFeatures.bbq": req.body.propertyFeatures.bbq,
    "propertyFeatures.ensuitLandry": req.body.propertyFeatures.ensuitLandry,
    "propertyFeatures.furnished": req.body.propertyFeatures.furnished,
    "propertyFeatures.bicycleParking": req.body.propertyFeatures.bicycleParking,
    "propertyFeatures.securitySystem": req.body.propertyFeatures.securitySystem,
    "propertyFeatures.reconstructed": req.body.propertyFeatures.reconstructed,
    "propertyFeatures.gym": req.body.propertyFeatures.gym,
    "propertyFeatures.hardwoodFloors": req.body.propertyFeatures.hardwoodFloors,
    "propertyFeatures.garden": req.body.propertyFeatures.garden,
    "utilities.hydro": req.body.utilities.hydro, 
    "utilities.heat": req.body.utilities.heat, 
    "utilities.electricity": req.body.utilities.electricity, 
    "utilities.gas": req.body.utilities.gas, 
    "utilities.tvOrCable": req.body.utilities.tvOrCable, 
  }

  // ? DBM Instance
  const DB = new DBM();
    DB.getEntityLimit(HomeModel, query, 20)
    .then( listings => {
        console.log(listings)
      if (listings.length == 0){
          console.log("404")
          res.send(404);
          return;
      }
      let avgPrice = 0;
      for (listing of listings){
        avgPrice += parseInt(listing.historyPrice[0], 10);
      }

      res.send({ avgPrice })
      return;
    })
    .catch(error => res.sendStatus(500));
});

module.exports = router;