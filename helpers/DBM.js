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

  async getEntity(MODEL, query) {
    const entity = await MODEL.find(query);
    return entity;
  }

  async updateEntity(MODEL, query) {
    const updatedEntity = await MODEL.findOneAndUpdate(query);
    return updatedEntity;
  }

  async deleteEntity(MODEL, query) {
    const deletedEntity = await MODEL.findOneAndRemove(query);
    return deletedEntity;
  }
}

module.exports = DBM;