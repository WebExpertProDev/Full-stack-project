const mongoose = require('mongoose');

const BecomeAPartnerSchema = new mongoose.Schema({
  username: { type: String },
  password: { type: String },
  companyName: { type: String },
  websiteURL: { type: String },
  youtubeLink: { type: String },
  companySize: { type: String },
  streetAddress: { type: String },
  unitNumber: { type: String },
  city: { type: String },
  province: { type: String },
  postalCode: { type: String },
  latAndLong: { type: String }, // ? should be subdocument
  serviceType: { type: String },
  locationOfService: { type: String }
});

const BecomeAPartnerModel = mongoose.model('BecomeAPartnerModel', BecomeAPartnerSchema);
module.exports = BecomeAPartnerModel;