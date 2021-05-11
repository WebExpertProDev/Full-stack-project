const router = require('express').Router();
const DBM = require('../../helpers/DBM');
const HomeModel = require('../../Schemas/homeSchema');
const Analytics = require('analytics-node');
const analytics = new Analytics(process.env.API_KEY_SEGMENT);

router.get('/getHomeListings/:gid', (req, res, next) => {
    const id = req.params.gid;
  const DB = new DBM();
  DB.getEntitiesbyagentID(HomeModel, id)
    .then(result => res.send(result))
    .catch(error => res.sendStatus(404));
  analytics.track({
    anonymousId:'Home Request',
    event: 'Get Home Listing by agent',
  });
});

module.exports = router;