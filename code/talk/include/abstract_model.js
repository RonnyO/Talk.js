var AbstractModel = function(Model){

  /**
   * Creates a new document.
   * @param {Object} attrs - new record attributes
   * @param {Function} callback - create action callback
   */
  this.create = function(attrs, callback){
    attrs['created_at'] = new Date();
    var model = new Model(attrs);
    model.save(callback.bind(this));
  };

  /**
   * Counts documents by criteria.
   * @param {Object} conditions - count query conditions
   * @param {Function} callback - count action callback
   */
  this.count = function(conditions, callback){
    var args = get_args_with_scoped_callback.call(this,arguments);
    Model.count.apply(Model, args);
  };
  
  /**
   * Finds documents by criteria
   * @param {Object} query - search criteria object
   * @param {Array} fields (Optional) - fields to return in found documents
   * @param {Object} options (Optional) - query options (for example: {limit:1})
   * @param {Function} callback - search action callback
   */
  this.find = function(query, fields, options, callback){
    var args = get_args_with_scoped_callback.call(this,arguments);
    Model.find.apply(Model, args);
  };
  
  /**
   * Finds one document by criteria
   * @param {Object} query - search criteria object
   * @param {Array} fields (Optional) - fields to return in found documents
   * @param {Object} options (Optional) - query options (for example: {limit:1})
   * @param {Function} callback - search action callback
   */
  this.findOne = function(query, fields, options, callback){
    var args = get_args_with_scoped_callback.call(this,arguments);
    Model.findOne.apply(Model, args);
  };
  
  /**
   * Finds one document by ObjecTId
   * @param {ObjectId / String} id - document ObjectId
   * @param {Array} fields (Optional) - fields to return in found documents
   * @param {Object} options (Optional) - query options (for example: {limit:1})
   * @param {Function} callback - search action callback
   */
  this.findById = function(id, fields, callback){
    var args = get_args_with_scoped_callback.call(this,arguments);
    Model.findById.apply(Model, args);
  };

  /**
   * Update documents by criteria
   * @param {Object} conditions - search criteria for documents to be updated
   * @param {Object} update - updated attributes and values
   * @param {Object} options - search criteria options
   * @param {Function} callback - update action callback
   */
  this.update = function(conditions, update, options, callback){
    var args = get_args_with_scoped_callback.call(this,arguments);
    Model.update.apply(Model, args);
  };
  
  /**
   * Removes documents by criteria
   * @param {Object} conditions - search criteria for documents to be removed
   * @param {Function} callback - remove action callback
   */
  this.remove = function(conditions, callback){
    Model.remove(conditions, callback.bind(this));
  };

  /**
   * Returns reference to the internal Mongoose model object for advance querying
   */
  this.object = function(){
    return Model;
  };
  
  /**
   * Modifies a callback in args to run under the model's scope.
   * Allows to refer to the model using 'this' inside a callback
   * @param {Object} args - model method arguments
   */
  var get_args_with_scoped_callback = function(args){
    for(var k in args){
      if(args.hasOwnProperty(k)){
        var arg = args[k];
        if(typeof(arg) === 'function'){
          console.log(k);
          args[k] = arg.bind(this);
        }
      }
    }
    return args;
  };
};

module.exports = AbstractModel;