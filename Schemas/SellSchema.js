// NO LONGER IN USE

// const { string } = require('joi');
// const mongoose = require('mongoose');
// const timeStamp = require('mongoose-timestamp');

// const SellSchema = new mongoose.Schema({
//   price: {type:String},
//   image:{type:String},
//   isAvailable: {type: Boolean, default: false},
//   agentID: {type: String},
//   houseTitle: { type: String },
//   hasAI: { type: Boolean, default: false },
//   hasAIAndAgent: { type: Boolean, default: false },
//   size: { type: String },
//   bedRoomCount: { type: String },
//   bathRoomCount: { type: String },
//   parkingCount: { type: String },
//   availabilityDate: { type: String },
//   mlsNumber: { type: String },
//   isMLSListed: { type: Boolean, default: false },
//   latAndLong: { lat: {type: String}, Long: {type: String}},
//   // ? should be available
//   streetAddress: { type: String },
//   unitNumber: { type: String },
//   city: { type: String },
//   province: { type: String },
//   postalCode: { type: String },
//   propertyType: { type: String },
//    // ? should be subdocument
//   openHouseDate: {
//     start: { type: Date },
//     end: { type: Date }
//   },
//   propertyFeatures: {
//     swimmingPool: { type: Boolean, default: false },
//     elevator: { type: Boolean, default: false },
//     petFriendly: { type: Boolean, default: false },
//     parking: { type: Boolean, default: false },
//     airConditioning: { type: Boolean, default: false },
//     balcony: { type: Boolean, default: false },
//     bbq: { type: Boolean, default: false },
//     ensuitLandry: { type: Boolean, default: false },
//     furnished: { type: Boolean, default: false },
//     bicycleParking: { type: Boolean, default: false },
//     securitySystem: { type: Boolean, default: false },
//     reconstructed: { type: Boolean, default: false },
//     gym: { type: Boolean, default: false },
//     hardwoodFloors: { type: Boolean, default: false },
//     garden: { type: Boolean, default: false },
//   },
//   utilities: {
//     hydro: { type: Boolean, default: false },
//     heat: { type: Boolean, default: false },
//     water: { type: Boolean, default: false },
//     internet: { type: Boolean, default: false },
//     tvOrCable: { type: Boolean, default: false },
//   }
// });

// // mongoose.plugin(timeStamp);
// const SellModel = mongoose.model('SellModel', SellSchema);
// module.exports = SellModel;