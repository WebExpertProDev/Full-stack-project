const mongoose = require('mongoose');

const RentSchema = new mongoose.Schema({
  availabilityDate: { type: String },
  streetAddress: { type: String },
  unitNumber: { type: String },
  city: { type: String },
  province: { type: String },
  postalCode: { type: String },
  propertyType: { type: String },
  latAndLong: { type: String }, // ? should be subdocument
  openHouseDate: {
    start: { type: String } ,
    end: { type: String } ,
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
  },
  utilities: {
    hydro: { type: Boolean, default: false },
    heat: { type: Boolean, default: false },
    water: { type: Boolean, default: false },
    internet: { type: Boolean, default: false },
    tvOrCable: { type: Boolean, default: false },
  },
  nearby: {
    bank: { type: Boolean, default: false },
    bike: { type: Boolean, default: false },
    trails: { type: Boolean, default: false },
    cafe: { type: Boolean, default: false },
    gasStation: { type: Boolean, default: false },
    localGym: { type: Boolean, default: false },
    hospital: { type: Boolean, default: false },
    school: { type: Boolean, default: false },
    pool: { type: Boolean, default: false },
    park: { type: Boolean, default: false },
    publicTranspport: { type: Boolean, default: false },
    restaurant: { type: Boolean, default: false },
    shopping: { type: Boolean, default: false },
    dogParks: { type: Boolean, default: false },
    grocery: { type: Boolean, default: false },
  },
  monthlyRent: { type: String },
  securityDeposit: { type: String },
  mlsNumber: { type: String },
  isMLSListed: { type: Boolean, default: false }
});

const RentModel = mongoose.model('RentModel', RentSchema);
module.exports = RentModel;