var AbstractModel = function(Model){

  this.create = function(attrs, callback){
    attrs['created_at'] = new Date();
    var model = new Model(attrs);
    return model.save(callback);
  }

  this.find = function(query, fields, options, callback){
    return Model.find(query, fields, options, callback);
  }

  this.update = function(conditions, update, options, callback){
    if(typeof(options) === 'function' && typeof(callback) === 'undefined'){
      var callback = options,
          options = null;
    }
    return Model.update(conditions, update, options, callback);
  }

  this.remove = function(conditions, callback){
    return Model.remove(conditions, callback);
  }

  this.object = function(){
    return Model;
  }

}

module.exports = AbstractModel;