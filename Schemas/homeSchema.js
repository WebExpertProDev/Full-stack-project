const { string, bool } = require('joi');
const mongoose = require('mongoose');
const timeStamp = require('mongoose-timestamp');

const RentSchema = new mongoose.Schema({
  forRent: { type: Boolean, required: true }, 
  rentPerUnit: {type: String},
  rentPerTime: {type: String},
  
  views: { type: String, default: "0" },
  description: { type: String, default: "" },
  historyPrice: { type: [Number], default: [] },  // first element is the latest price
  image:{ type: [String], default: [] },
  isAvailable: { type: Boolean, default: false },
  dateListed: { type: String, required: true },  // YYYY/MM/DD
  agentID: { type: [String], default: [] },
  availabilityDate: { start: { type: String }, end: {type: String} },
  hasAI: { type: Boolean, default: false },
  hasAIAndAgent: { type: Boolean, default: false },
  propertyTaxes: { type: String, default: "0" },
  maintenanceFee: { type: String, default: "0" },

  streetAddress: { type: String, default: "" },
  city: { type: String, default: "" },
  province: { type: String, default: "" },
  postalCode: { type: String, default: "" },
  latAndLong: { lat: {type: String}, Long: {type: String} },
  
  openHouseDate: {
    start: { type: String, default: "" } ,
    end: { type: String, default: "" } ,
  },
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
    more: { type: String, default: ""}  // "feature1, feature2, feature3"
  },
  utilities: {
    hydro: { type: Boolean, default: false },
    heat: { type: Boolean, default: false },
    electricity: { type: Boolean, default: false },
    gas: { type: Boolean, default: false },
    tvOrCable: { type: Boolean, default: false },
  },
  nearby: {
    School: { type: [String], default: [] },
    Bank: { type: [String], default: [] },
    Foodservice: { type: [String], default: [] },
    Parks: { type: [String], default: [] },
    Stores: { type: [String], default: [] },
    Others: { type: [String], default: [] }
  },
  securityDeposit: { type: String, default: "" }, // todo
  mlsNumber: { type: String, default: "" },
  isMLSListed: { type: Boolean, default: false }
});

// mongoose.plugin(timeStamp);
const HomeModel = mongoose.model('HomeModel', RentSchema);
module.exports = HomeModel;