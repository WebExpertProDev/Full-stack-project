const mongoose = require('mongoose');

const TourSchema = new mongoose.Schema({
  latAndLong: { type: String }, // ? should be subdocument
  homeCount: { type: String },
  date: { 
    start: { type: String },
    end: { type: String }
  },
  hasAgent: { type: Boolean, default: false }
});

const TourModel = mongoose.model('TourModel', TourSchema);
module.exports = TourModel;