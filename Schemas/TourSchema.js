const mongoose = require('mongoose');
// const timeStamp = require('mongoose-timestamp');

const TourSchema = new mongoose.Schema({
  streetAddress: { type: String },
  city: { type: String },
  province: { type: String },
  postalCode: { type: String },
  homeCount: { type: String },
  date: { 
    start: { type: String },
    end: { type: String }
  },
  hasAgent: { type: Boolean, default: false }
});

// mongoose.plugin(timeStamp);
const TourModel = mongoose.model('TourModel', TourSchema);
module.exports = TourModel;