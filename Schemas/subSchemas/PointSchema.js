const mongoose = require('mongoose');
const timeStamp = require('mongoose-timestamp');

const PointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true
  },
  coordinates: {
    type: [Number],
    required: true
  }
});

mongoose.plugin(timeStamp);
const PointModel = mongoose.model('PointModel', PointSchema);
module.exports = PointModel;