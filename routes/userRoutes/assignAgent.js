const router = require('express').Router();
const Joi = require('joi');
const Analytics = require('analytics-node');
const analytics = new Analytics(process.env.API_KEY_SEGMENT);
const DBM = require('../../helpers/DBM');
const UserModel = require('../../Schemas/UserSchema');
const AgentModel = require('../../Schemas/AgentSchema')

router.post('/assignAgent', (req, res, next) => {  
  

  // if called by signup, username must present.
  const { userid, city } = req.body;

  const validateSchema = Joi.object().keys({
    userid: Joi.string(),
    city: Joi.string()
  });
  
  if (validateSchema.validate(req.body).errors !== undefined || null) {
    res.sendStatus(406);
    return;
  }

  const DB = new DBM();

  DB.getEntitybyID(UserModel, userid)
    .then( user =>{
        if (!user){
            res.sendStatus(404);
            return Promise.reject(404);
        } else if (!user.hasAgent){
            res.sendStatus(403);
            return Promise.reject(403);
        } else{
            return DB.getEntity(AgentModel, { city });
        }
    })
    .then( agents => {
        if (agents.length == 0){
            res.sendStatus(404);
            return Promise.reject(404);
        } else{
            return agents[Math.floor(Math.random() * agents.length)]
        }
    })
    .then( agent => {
        return DB.updateEntitybyID(UserModel, userid, { assignedAgentId: agent._id }, { new: true });
    })
    .then( assignedUser => {
        return res.send({ assignedAgentId: assignedUser.assignedAgentId })
    })
    .catch( code =>{
        if (code == 404 || code == 403){
            return;
        }
        res.sendStatus(500);
    })


  analytics.identify({
    anonymousId: userid,
    timestamp: new Date(),
  });
  analytics.track({
    anonymousId: userid,
    event: 'Assigned user an agent.',
  });
});

module.exports = router;
