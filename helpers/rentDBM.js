const RentModel = require('../Schemas/RentSchema');

class RentDBM {
  async addListings(data) {
    console.log(data);
    const newListing = await new RentModel(data);
    const entity = await newListing.save();
    return entity;
  }

  async getListings() {
    const listing = await RentModel.find();
    const result = await listing;
    return result;
  }
}

module.exports = RentDBM;