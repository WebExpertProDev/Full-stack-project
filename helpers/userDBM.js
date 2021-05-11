const UserModel = require('../Schemas/UserSchema');

class UserDBM {
  // ? Add User
  async addUser(data) {
    // const newEntity = await new UserModel({
    //   phone: data[0],
    //   isLoggedIn: data[1],
    //   username: data[2],
    //   password: data[3],
    //   hasAgent: data[4],
    //   hasAI: data[5],
    //   isOwner: data[6],
    //   isTenant: data[7],
    //   hasProperty: data[8],
    // });
    // const newEntity = await new UserModel(data);

    // const savedEntity = await newEntity.save();
    // const result = await savedEntity;
    const newUser = await new UserModel(data);
    const result = newUser.save();
    return result;
  }

  async getEntities () {
    const entity = await UserModel.find({});
    const result = await entity;
    return result;
  }
  async signIn(email, username){
    const result = await UserModel.findOneAndUpdate({ email: email, username: username }, { isLoggedIn: true });
    return result;
  }
  async signOut(email, username){
    const result = await UserModel.findOneAndUpdate({ email: email, username: username }, { isLoggedIn: false });
    return result;
  }

  async logIn(phone){
    const result = await UserModel.findOneAndUpdate({ phone: phone }, { isLoggedIn: true });
    return result;
  }

  async logOut(phone){
    const result = await UserModel.findOneAndUpdate({ phone: phone }, { isLoggedIn: false });
    return result;
  }

  async getUser(phone){
    const result = await UserModel.findOne({ phone: phone });
    return result;
  }

  async isLoggedIn(phone){
    const result = await UserModel.findOne({ phone: phone });
    return result && result.isLoggedIn;
  }
}

module.exports = UserDBM;

/*
  * here we manage database with UserDBM class
  * version 0.0.1
*/