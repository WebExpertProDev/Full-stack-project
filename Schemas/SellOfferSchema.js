const { string, bool } = require('joi');
const mongoose = require('mongoose');
const timeStamp = require('mongoose-timestamp');

const SellOfferSchema = new mongoose.Schema({
  HouseId: { type: String},
  UserId: { type: String},
  OfferPrice: {type: String},
  OfferDate: { type: Date },
  OfferFile: {type: String},
});

const SellModel = mongoose.model('SellModel', SellOfferSchema);
module.exports = SellModel;