var DB = require('./include/mongoose'),
    fs = require('fs');

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

/**
 * Define the Talk object
 */
var Talk = function(){

  /** Entry point to ORM abstraction layer **/
  this.models = {};
  /**
   * Internal boot of the Talk instance.
   * Add any relevant private boot-related calls here.
   */
  function boot(){
    init_orm.call(this);
  }
  
  /**
   * Initialize the available models.
   * Map each model to this[model_name]. Allows to automatically map new models as instance properties.
   * For example talk.user will map to the User model assuming we have a User model defined under models/user.js
   */
  function init_orm(){
    var models      = require('./models'),
        model_files = fs.readdirSync(__dirname+'/models'),
        _this       = this;
        
    model_files.forEach(function(file){
      if(file !== 'index.js'){
        var model = file.replace(/\.js/,'');
        _this.models[model] = new AbstractModel(models[model]);
      }
    });
  }
  
  boot.call(this);
}


/**
 * Talk object class methods
 */

Talk.prototype = {
  /**
   * Initialize the talk instance.
   * Connect to MongoDB.
   * Require all models from ./models package
   */
  init:function(){
    //var db = DB.Mongoose.createConnection("mongodb://localhost/talk_js");
    DB.Mongoose.connect('mongodb://localhost/talk_js');
  }
}

module.exports = new Talk();