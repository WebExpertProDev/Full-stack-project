const router = require('express').Router();
const UserDBM = require('../../helpers/userDBM');

router.get('/users', (req, res, next) => {
  const DBM = new UserDBM();
  DBM.getEntities()
    .then(data => res.send(data))
    .catch(error => res.sendStatus(400).send(error.message));
});

module.exports = router;