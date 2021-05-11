// NO LONGER IN USE

// const DBM = require('../../helpers/DBM');
// const Analytics = require('analytics-node');
// const analytics = new Analytics(process.env.API_KEY_SEGMENT);
// const router = require('express').Router();
// const SellModel = require('../../Schemas/SellSchema');

// router.get('/getSellListings', (req, res, next) => {
//   const DB = new DBM();

//   DB.getEntities(SellModel)
//     .then(result => res.send(result))
//     .catch(error => res.sendStatus(406));

//     analytics.track({
//       anonymousId: 'getlisting',
//       event: 'Get Sell Listings',
//     });
// });

// module.exports = router;