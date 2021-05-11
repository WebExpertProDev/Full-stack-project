const mongoose = require('mongoose');

const PartnerSchema = new mongoose.Schema({
  username: { type: String },
  password: { type: String },
});

const PartnerModel = mongoose.model('PartnerModel', PartnerSchema);
module.exports = PartnerModel;