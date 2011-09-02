var AbstractModel = function(Model){

  /**
   * Creates a new document.
   * @param {Object} attrs - new record attributes
   * @param {Function} callback - create action callback
   */
  this.create = function(attrs, callback){
    attrs['created_at'] = new Date();
    var model = new Model(attrs);
    model.save(callback);
    return this;
  }

  /**
   * Counts documents by criteria.
   * @param {Object} conditions - count query conditions
   * @param {Function} callback - count action callback
   */
  this.count = function(conditions, callback){
    Model.count.apply(Model, arguments);
    return this;
  }
  
  /**
   * Finds documents by criteria
   * @param {Object} query - search criteria object
   * @param {Array} fields (Optional) - fields to return in found documents
   * @param {Object} options (Optional) - query options (for example: {limit:1})
   * @param {Function} callback - search action callback
   */
  this.find = function(query, fields, options, callback){
    Model.find.apply(Model, arguments);
    return this;
  }
  
  /**
   * Finds one document by criteria
   * @param {Object} query - search criteria object
   * @param {Array} fields (Optional) - fields to return in found documents
   * @param {Object} options (Optional) - query options (for example: {limit:1})
   * @param {Function} callback - search action callback
   */
  this.findOne = function(query, fields, options, callback){
    Model.findOne.apply(Model, arguments);
    return this;
  }
  
  /**
   * Finds one document by ObjecTId
   * @param {ObjectId / String} id - document ObjectId
   * @param {Array} fields (Optional) - fields to return in found documents
   * @param {Object} options (Optional) - query options (for example: {limit:1})
   * @param {Function} callback - search action callback
   */
  this.findById = function(id, fields, callback){
    Model.findById(id, fields, callback);
    return this;
  }

  /**
   * Update documents by criteria
   * @param {Object} conditions - search criteria for documents to be updated
   * @param {Object} update - updated attributes and values
   * @param {Object} options - search criteria options
   * @param {Function} callback - update action callback
   */
  this.update = function(conditions, update, options, callback){
    Model.update.apply(Model, arguments);
    return this;
  }
  
  /**
   * Removes documents by criteria
   * @param {Object} conditions - search criteria for documents to be removed
   * @param {Function} callback - remove action callback
   */
  this.remove = function(conditions, callback){
    Model.remove(conditions, callback);
    return this;
  }

  /**
   * Returns reference to the internal Mongoose model object for advance querying
   */
  this.object = function(){
    return Model;
  }

}

module.exports = AbstractModel;