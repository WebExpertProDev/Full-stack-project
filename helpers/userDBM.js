const UserModel = require('../Schemas/UserSchema');

class UserDBM {
  // ? Add User
  async addUser (...data) {
    const newEntity = await new UserModel({
      username: data[0],
      password: data[1],
      hasAgent: data[2],
      hasAI: data[3],
      isOwner: data[4],
      isTenant: data[5],
      hasProperty: data[6]
    });

    const savedEntity = await newEntity.save();
    const result = await savedEntity;
    return result;
  }

  async getEntities () {
    const entity = await UserModel.find({});
    const result = await entity;
    return result;
  }
}

module.exports = UserDBM;

/*
  * here we manage database with UserDBM class
  * version 0.0.1
*/