const HomeModel = require('../Schemas/homeSchema');

class HomeDBM {
  async addListings(data) {
    // console.log(data);
    const newListing = await new HomeModel(data);
    const entity = await newListing.save();
    return entity;
  }
  async getListEntities(MODEL, query){
    const entity = await MODEL.find(query);
    return entity;
  }

  async getListings() {
    const listing = await HomeModel.find();
    const result = await listing;
    return result;
  }
}

module.exports = HomeDBM;