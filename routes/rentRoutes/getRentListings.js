const router = require('express').Router();
const DBM = require('../../helpers/DBM');
const RentModel = require('../../Schemas/RentSchema');

router.get('/getRentListings', (req, res, next) => {
  const DB = new DBM();
  DB.getEntities(RentModel)
    .then(result => res.send(result))
    .catch(error => res.sendStatus(404));
});

module.exports = router;