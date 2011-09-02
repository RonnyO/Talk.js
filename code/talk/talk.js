var DB            = require('./include/mongoose'),
    fs            = require('fs'),
    AbstractModel = require('./include/abstract_model');

/**
 * Define the Talk object
 */
var Talk = function(){

  /** 
   * @@NOTE
   * Calls to private methods in the Talk module should be done using call / apply to perserve the execution scope.
   */

  /** Entry point to ORM abstraction layer **/
  this.models = {};

  /** Entry point to plugins **/
  this.plugins = {};

  /**
   * Internal boot of the Talk instance.
   * Add any relevant private boot-related calls here.
   */
  function boot(){
    init_orm.call(this);
    load_plugins.call(this);
  }
  
  /**
   * Initialize the available models.
   * Map each model to this[model_name]. Allows to automatically map new models as instance properties.
   * For example talk.user will map to the User model assuming we have a User model defined under models/user.js
   */
  function init_orm(){
    var obj_name = 'models';
    var init_callback = function(package, package_name){
      this.models[package_name] = new AbstractModel(package[package_name]);
    }
    auto_load.apply(this, [obj_name, init_callback]);
  }
  
  /**
   * Talk plugins autoloading.
   * Load any plugins inside ./plugins and map them to this.plugins
   */
  function load_plugins(){
    var obj_name = 'plugins';
    var init_callback = function(package, package_name){
      this.plugins[package_name] = new package[package_name](this);
    }
    auto_load.apply(this, [obj_name, init_callback]);
  }

  /**
   * Auto load a directory as package and map loaded modules into an object.
   * Used to autoload models and plugins.
   * @param {String} obj_name - Name of the loaded package. Used to find the package's directory and Talk object it maps to.
   *                            Should be by convension the name of the directory defining the package.
   *                            For example, the models package is inside ./models directory (relative to talk.js) and is mapped to this.models
   * @param {Function} init_function - Function to execute for each loaded module in the package
   */
  function auto_load(obj_name, init_function){
    var package       = require('./'+obj_name),
        package_files = fs.readdirSync(__dirname+'/'+obj_name);
        
    package_files.forEach(function(file){
      if(file !== 'index.js'){
        var package_name = file.replace(/\.js/,'');
        init_function.apply(this, [package, package_name]);
      }
    }.bind(this));
  }

  /** Call the boot function **/
  boot.call(this);
}


/**
 * Talk object class methods
 */

Talk.prototype = {
  /**
   * Initialize the talk instance.
   * Connect to MongoDB.
   */
  init:function(){
    DB.Mongoose.connect('mongodb://localhost/talk_js');
  }
}

module.exports = new Talk();