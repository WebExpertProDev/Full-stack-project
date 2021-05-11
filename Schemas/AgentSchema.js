const mongoose = require('mongoose');
// const timeStamp = require('mongoose-timestamp');

const AgentSchema = new mongoose.Schema({
  username: { type: String },
  password: { type: String },
  name: { type: String },
  family: { type: String },
  registrationNumber: { type: String },
  provinceOfRegistration: { type: String },
  streetAddress: { type: String },
  unitNumber: { type: String },
  city: { type: String },
  province: { type: String },
  postalCode: { type: String },
  latAndLong: { lat: {type: String}, Long: {type: String} },
  dealsCountInYear: { type: String },
  territories: { type: String },
  isAgreedToRefrain: { type: Boolean, default: false },
  isAgreedToDualAgencyRefrain: { type: Boolean, default: false },
  isAgreedToNotToChargeClientsMore: { type: Boolean, default: false },
});

// mongoose.plugin(timeStamp);
const AgentModel = mongoose.model('AgentModel', AgentSchema);
module.exports = AgentModel;