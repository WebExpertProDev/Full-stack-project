const router = require('express').Router();
const UserDBM = require('../../helpers/userDBM');
const Analytics = require('analytics-node');
const analytics = new Analytics(process.env.API_KEY_SEGMENT);

router.get('/users', (req, res, next) => {
  const DBM = new UserDBM();
  DBM.getEntities()
    .then(data => res.send(data))
    .catch(error => res.sendStatus(400).send(error.message));
  
  analytics.track({
    anonymousId: "Upload",
    event: 'Get Users',
  });
});

module.exports = router;