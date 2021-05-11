const OfferModel = require('../Schemas/sellOfferSchema');

class OfferDBM {
    async addOffer(data) {
        const newOffer = await new OfferModel(data);
        const result = newOffer.save();
        return result;
      }

}

module.exports = OfferDBM;