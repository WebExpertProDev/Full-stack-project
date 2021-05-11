const DBM = require('../../helpers/DBM');

const router = require('express').Router();
const SellModel = require('../../Schemas/SellSchema');

router.get('/getSellListings', (req, res, next) => {
  const DB = new DBM();
  DB.getEntities(SellModel)
    .then(result => res.send(result))
    .catch(error => res.sendStatus(406));
});

module.exports = router;