const { bool, string } = require('joi');
const mongoose = require('mongoose');
const timeStamp = require('mongoose-timestamp');

const UserSchema = new mongoose.Schema({
  userType: {type: String,  required: true},
  email: {type:String, default: ""},
  phone: { type: String},
  username: { type: String, required: true },
  // password: { type: String, required: true },
  isLoggedIn: { type: Boolean, default: false },
  hasAgent: { type: Boolean, default: false },
  hasAI: { type: Boolean, default: false },
  isOwner: { type: Boolean, default: false },
  isTenant: { type: Boolean, default: false },
  hasProperty: { type: Boolean, default: false },
  token: { type: String },
  assignedAgentId: { type: String },

});

mongoose.plugin(timeStamp);
const UserModel = mongoose.model('UserModel', UserSchema);
module.exports = UserModel; 