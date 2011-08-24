var DB = require('./include/mongoose'),
    fs = require('fs');

/**
 * Define the Talk object
 */
var Talk = function(){
  
  /** Object to hold all application models within a confined namespace **/
  this.ORM = {};
  
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
        _self       = this;
        
    model_files.forEach(function(file){
      if(file !== 'index.js'){
        var model = (file.charAt(0).toUpperCase() + file.slice(1)).replace(/\.js/,'');
        _self.ORM[model] = models[model];
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