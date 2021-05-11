const router = require('express').Router();
const Joi = require('joi');
const OfferDBM = require('../../helpers/offerDBM');
const DBM = require('../../helpers/DBM')
const Analytics = require('analytics-node');
const { query } = require('express');
const analytics = new Analytics(process.env.API_KEY_SEGMENT);
router.post('/addSellOffer', (req, res, next) => {
    let { HouseId,
    UserId,
    OfferPrice,
    OfferDate } = req.body;
        
    const validateSchema = Joi.object().keys({
        HouseId: Joi.string(),
        UserId: Joi.string(),
        OfferPrice: Joi.string(),
        OfferDate: Joi.date(),
        OfferFile: Joi.string(),
    });

    if (validateSchema.validate(req.body).error !== undefined || null) {
        res.sendStatus(406);
        return;
    }

    const OfferDBM = new OfferDBM();
    OfferDB.addEntity({HouseId,
        UserId,
        OfferPrice,
        OfferDate,
      })
     .then(result => res.send(result) )
     .catch(error => res.sendStatus(406));
     analytics.identify({
       anonymousId: UserId,
       traits: {
        HouseId: HouseId,
       },
       timestamp: new Date(),
     });
    analytics.track({
       anonymousId: houseTitle,
       event: 'Sell Offer Added',
     });

});

module.exports=router;