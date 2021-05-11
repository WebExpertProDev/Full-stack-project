class DBM {
  async addEntity(MODEL, data) {
    const newEntity = await new MODEL(data);
    const result = await newEntity.save();
    return result
  }

  async getEntities(MODEL) {
    const entity = await MODEL.find();
    return entity;
  }

  // Given a model and an agent id, we can find 
  // every data from the model associated to the agent id 
  // MODEL is MODEL
  // agentId is agent id
  async getEntitiesbyagentID(MODEL, agentId){
    const entity = await MODEL.find({"agentID": agentId});
    return entity;
  }

  async getEntitybyID(MODEL, id){
    const entity = await MODEL.findById(id);
    return entity;
  }

  async getEntity(MODEL, query) {
    const entity = await MODEL.find(query);
    return entity;
  }

  async getEntityLimit(MODEL, query, limit) {
    const entity = await MODEL.find(query).limit(limit);
    return entity;
  }

  async getOneEntity(MODEL, query) {
    const entity = await MODEL.findOne(query);
    return entity;
  }

  async updateEntity(MODEL, query, update) {
    const updatedEntity = await MODEL.findOneAndUpdate(query, update);
    return updatedEntity;
  }

  async updateEntitybyID(MODEL, id, update, options) {
    const updatedEntity = await MODEL.findByIdAndUpdate(id, update, options);
    return updatedEntity;
  }

  async deleteEntity(MODEL, query) {
    const deletedEntity = await MODEL.findOneAndRemove(query);
    return deletedEntity;
  }

  async updateById(MODEL, id, update){
    const updateEntity = await MODEL.findByIdAndUpdate(id, update);
    return updateEntity;
  }
}

module.exports = DBM;