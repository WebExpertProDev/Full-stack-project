const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String },
  password: { type: String },
  hasAgent: { type: Boolean, default: false },
  hasAI: { type: Boolean, default: false },
  isOwner: { type: Boolean, default: false },
  isTenant: { type: Boolean, default: false },
  hasProperty: { type: Boolean, default: false },
  token: { type: String },
});

const UserModel = mongoose.model('UserModel', UserSchema);
module.exports = UserModel;