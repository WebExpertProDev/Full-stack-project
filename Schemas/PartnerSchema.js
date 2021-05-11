const mongoose = require('mongoose');
const timeStamp = require('mongoose-timestamp');

const PartnerSchema = new mongoose.Schema({
  username: { type: String },
  password: { type: String },
});

mongoose.plugin(timeStamp);
const PartnerModel = mongoose.model('PartnerModel', PartnerSchema);
module.exports = PartnerModel;